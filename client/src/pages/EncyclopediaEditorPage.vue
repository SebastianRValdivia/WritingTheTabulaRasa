<template>
  <q-page class="q-pa-md q-gutter-sm">
    <div id="wiki-head" class="row">
      <q-input 
        v-model="titleInput" 
        :placeholder="$t('encyclopediaEditorPage.title')"
        input-class="title-input"
        class="col-10"
      />
      <div class="col-2 column items-center">
        <q-btn
          class="q-mt-md"
          icon="post_add"
          @click="toggleCardEditor()"
        />
        <q-page-sticky 
          v-if="isCardEditorOpen"
          position="top-right" :offset="[20, 20]"
        >
          <q-card class="card-width">
            <div class="row justify-end">
              <q-btn 
                class="col-2 q-pa-sm"
                icon="close"
                flat 
                size="xs"
                @click="toggleCardEditor()"
              />
            </div>
            <q-card-section>
              <q-input
                v-model="cardContentInput"
                autogrow
                borderless
              />
            </q-card-section>
          </q-card>
        </q-page-sticky>
      </div>
      <q-input
        v-model="epigraphInput"
        :placeholder="$t('encyclopediaEditorPage.epigraph')"
        input-class="text-h4"
        autogrow
        borderless
        class="col-12"
      />
    </div>

    <q-separator inset />

    <div class="q-pa-md">
      <q-input
        v-model="contentInput"
        autogrow
        borderless
        :placeholder="$t('encyclopediaEditorPage.content')"
        @blur="toggleToPreview"
        v-if="!isPreviewOpen"
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
  <MetadataEditorDialog :isOpen="true"/>
  </q-page>
</template>

<script>
import { ref } from "vue"
import api from "src/api"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"
import { useMetadataStore } from "src/stores/metadata-store"
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

    const titleInput = ref("")
    const epigraphInput = ref("")
    const contentInput = ref("")
    const isCardEditorOpen = ref(false)
    const cardContentInput = ref("")
    const isPreviewOpen = ref(false)
    const pageMetadata = ref({})

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
      let metadataExist = pageMetadata.value.id 
      let resultPagePost = await wikiStore.saveWikiPage({
        title: titleInput.value,
        epigraph: epigraphInput.value,
        content: contentInput.value,

        ...(metadataExist && {metadata: pageMetadata.value.id})
      })
      if (cardContentInput.value !== "" && resultPagePost) {
        let resultCardPost = await api.wiki.postWikiCard({
          content: cardContentInput.value,
          page: resultPagePost.id
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
      submit,
      toggleCardEditor,
      isCardEditorOpen,
      cardContentInput,
      isPreviewOpen,
      toggleToPreview,
      toggleToInput,
      openMetadataEditor,
      pageMetadata,
    }
  }
}
</script>

<style>
.title-input {
  font-size: 3rem;
}
.card-width {
  min-width: 18rem;
  max-width: 18rem;
}
</style>
