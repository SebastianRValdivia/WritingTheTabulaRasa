<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div id="wiki-head" class="row">
      <q-input
        v-model="titleInput"
        :placeholder="$t('encyclopediaEditorPage.title')"
        input-class="text-h3"
        class="col-10"
      />
      <q-input
        v-model="epigraphInput"
        :placeholder="$t('encyclopediaEditorPage.epigraph')"
        input-class="text-subtitle1"
        autogrow
        borderless
        class="col-10"
      />
      <div class="col-2 column justify-center">
      </div>
    </div>

    <q-separator inset />

      <q-btn
        class="q-mt-md card-editor-btn"
        icon="post_add"
        @click="toggleCardEditor()"
        v-if="isCardEditorOpen"
      />
      <q-card
        v-if="!isCardEditorOpen"
        class="wiki-card-editor"
      >
        <div class="row justify-end">
          <q-btn
            class="col-2 q-pa-sm"
            icon="close"
            flat
            size="xs"
            @click="toggleCardEditor()"
          />
        </div>
        <q-file
          v-if="!imageInputUrl"
          class="col-2"
          filled
          v-model="imageInput"
          :label="$t('encyclopediaEditorPage.presentationImage')"
        >
          <template v-slot:after>
            <q-btn
              round
              size="sm"
              flat
              icon="send"
              @click="createImageUrl"
            />
          </template>
        </q-file>
        <q-img
          v-else
          class="q-pa-xs card-image"
          :src="imageInputUrl"
        />
        <q-card-section>
          <q-input
            v-model="cardContentInput"
            autogrow
            borderless
            class="q-pa-sm"
          />
        </q-card-section>
      </q-card>
    <q-input
      v-model="contentInput"
      autogrow
      borderless
      :placeholder="$t('encyclopediaEditorPage.content')"
      @blur="toggleToPreview"
      v-if="!isPreviewOpen"
      class="col-10"
    />
    <div class="q-pa-md" v-if="isPreviewOpen">
      <MarkdownPreview
        :md="contentInput"
        @click="toggleToInput"
      />
    </div>


    <div class="absolute-bottom">
      <q-separator />
      <div class="row">
        <div class="col-6">
          {{ $t("encyclopediaEditorPage.words")}}:
          {{ wordCount }}
        </div>
        <div class="col-6">
          {{ $t("encyclopediaEditorPage.characters")}}:
          {{ characterCount }}
        </div>
      </div>

      <div class="row justify-center">
        <q-btn icon="data_object" @click="openMetadataEditor"/>
      </div>
    </div>

    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn round icon="done" color="primary" @click="submit"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed } from "vue"
import api from "src/api"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"
import { useRouter } from "vue-router"

import { useWikiStore } from "src/stores/wiki-store"
import { useMetadataStore } from "src/stores/metadata-store"
import { useResourceStore } from "src/stores/resource-store"
import { countWords, countCharacters } from "src/utils/text"
import { errorNotification } from "src/utils/notifications"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"
import MetadataEditorDialog from "src/components/for-input/MetadataEditorDialog"

export default {
  name: "EncyclopediaEditorPage",
  components: {
    MarkdownPreview,
  },
  setup() {
    const { t } = useI18n()
    const quasar = useQuasar()
    const wikiStore = useWikiStore()
    const metadataStore = useMetadataStore()
    const resourceStore = useResourceStore()
    const router = useRouter()

    const titleInput = ref("")
    const epigraphInput = ref("")
    const contentInput = ref("")
    const isCardEditorOpen = ref(false)
    const cardContentInput = ref("")
    const isPreviewOpen = ref(false)
    const pageMetadata = ref({})
    const imageInput = ref()
    const imageInputUrl = ref("")

    const wordCount = computed(() => {
      return countWords(concatAllInput())
    })
    const characterCount = computed(() => {
      return countCharacters(concatAllInput())
    })

    function concatAllInput () {
      return contentInput.value.concat(
          epigraphInput.value,
          titleInput.value,
      )
    }
    async function openMetadataEditor() {
      quasar.dialog({
        component: MetadataEditorDialog
      }).onOk(async (metadataObject) => {
        let result = await metadataStore.createMetadataObject({
          content: metadataObject
        })
        if (result) pageMetadata.value = result
      })
    }
    async function submit () {
      let saveImageResult = null
      let savePageResult = null

      // Saves the image resource first
      if (imageInput.value) {
        saveImageResult = await resourceStore.createImageResource({
          file: imageInput.value,
        })
      }
      savePageResult = await wikiStore.saveWikiPage({
        title: titleInput.value,
        epigraph: epigraphInput.value,
        content: contentInput.value,

        // If null wont create
        ...(pageMetadata.value && {metadata: pageMetadata.value.id}),
        ...(saveImageResult && {image: saveImageResult.id})
      })
      // If user input something to the card creates the card
      if (cardContentInput.value !== "" && savePageResult) {
        let resultCardPost = await api.wiki.postWikiCard({
          content: cardContentInput.value,
          page: savePageResult.id
        })
        if (resultCardPost) router.push({name: "encyclopediaListPage"})
        else quasar.notify(errorNotification(t("general.failed")))
      } else {
        if (savePageResult) {
          router.push({name: "encyclopediaListPage"})
        } else quasar.notify(errorNotification(t("general.failed")))
      }
    }
    function toggleCardEditor() {
      isCardEditorOpen.value = !isCardEditorOpen.value
    }
    function toggleToPreview() {
      if (contentInput.value) {
        isPreviewOpen.value = true
      }
    }
    function createImageUrl() {
      // Creates a url to display the image
      if (imageInput.value) {
        imageInputUrl.value = URL.createObjectURL(imageInput.value)
      }
    }
    function toggleToInput() {
      isPreviewOpen.value = false
    }

    useMeta({
      title: t("encyclopediaEditorPage.pageTitle")
    })

    return {
      titleInput,
      epigraphInput,
      contentInput,
      cardContentInput,
      isPreviewOpen,
      isCardEditorOpen,
      pageMetadata,
      imageInput,
      imageInputUrl,
      wordCount,
      characterCount,

      submit,
      toggleCardEditor,
      toggleToPreview,
      toggleToInput,
      openMetadataEditor,
      createImageUrl,
    }
  }
}
</script>

<style>
.card-image {
  max-height: 15rem;
  max-width: 15rem;
  min-height: 15rem;
  min-width: 15rem;
}
.wiki-card-editor {
  max-height: 15rem;
  max-width: 15rem;
  min-height: 15rem;
  min-width: 15rem;
  float: right;
}
.card-editor-btn {
  float: right;
}
</style>
