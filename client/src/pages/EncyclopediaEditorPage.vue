<template>
  <q-page class="q-pa-md q-gutter-sm">
    <q-input 
      v-model="titleInput" 
      :placeholder="$t('encyclopediaEditorPage.title')"
      input-class="title-input"
    />
    <q-input
      v-model="epigraphInput"
      :placeholder="$t('encyclopediaEditorPage.epigraph')"
      input-class="text-h4"
      autogrow
      borderless
    />

    <q-separator inset />

    <q-editor
      v-model="contentInput"
      :definitions="{
      }"
      flat
    />

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="done" color="primary" @click="submit"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue"

import { useWikiStore } from "src/stores/wiki-store"

export default {
  name: "EncyclopediaEditorPage",
  setup() {
    const wikiStore = useWikiStore()

    const titleInput = ref("")
    const epigraphInput = ref("")
    const contentInput = ref("")

    async function submit () {
      let result = await wikiStore.saveWikiPage({
        title: titleInput.value,
        epigraph: epigraphInput.value,
        content: contentInput.value
      })
    }



    return {
      titleInput,
      epigraphInput,
      contentInput,
      submit,
    }
  }
}
</script>

<style>
.title-input {
  font-size: 3rem;
}
</style>
