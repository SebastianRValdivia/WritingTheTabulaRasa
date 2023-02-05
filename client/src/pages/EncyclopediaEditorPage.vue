<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div id="wiki-head" class="row">
      <q-input 
        v-model="titleInput" 
        :placeholder="$t('encyclopediaEditorPage.title')"
        input-class="title-input"
        class="col-10"
      />
      <q-input
        v-model="epigraphInput"
        :placeholder="$t('encyclopediaEditorPage.epigraph')"
        input-class="text-h4"
        autogrow
        borderless
        class="col-10"
      />
      <div class="col-2 column justify-center">
        <q-btn
          class="q-mt-md"
          icon="post_add"
          @click="toggleCardEditor()"
        />
        <q-card 
          v-if="isCardEditorOpen"
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
                dense 
                flat 
                icon="send"
                @click="createImageUrl"
              />
            </template>
          </q-file>
          <q-img 
            v-else
            class="q-pa-xs"
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
      </div>
    </div>

    <q-separator inset />

    <div class="q-pa-md row">
      <q-input
        v-model="contentInput"
        autogrow
        borderless
        :placeholder="$t('encyclopediaEditorPage.content')"
        @blur="toggleToPreview"
        v-if="!isPreviewOpen"
        class="col-10"
      />
    </div>
    <div class="q-pa-md" v-if="isPreviewOpen">
      <MarkdownPreview 
        :md="contentInput"
        @click="toggleToInput"
      />
    </div>

    <div class="row">
      <q-btn icon="add" @click="openMetadataEditor"/>
    </div>

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="done" color="primary" @click="submit"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue"
import api from "src/api"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"
import { useMetadataStore } from "src/stores/metadata-store"
import { useResourceStore } from "src/stores/resource-store"
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

    const titleInput = ref("")
    const epigraphInput = ref("")
    const contentInput = ref("")
    const isCardEditorOpen = ref(false)
    const cardContentInput = ref("")
    const isPreviewOpen = ref(false)
    const pageMetadata = ref({})
    const imageInput = ref()
    const imageInputUrl = ref("")

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
        saveImageResult = await resourceStore.saveImageResource({
          file: imageInput.value,
        })
      }
      console.log(saveImageResult)
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
.title-input {
  font-size: 3rem;
}
</style>
