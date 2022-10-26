<template>
  <q-list>
    <q-item v-for="wikiPage in wikiStore.getWikiPageList" :key="wikiPage.id">
      {{ wikiPage.title }}
    </q-item>
  </q-list>
</template>

<script>
import { onBeforeMount } from "vue"

import { useWikiStore } from "src/stores/wiki-store"

export default {
  name: "EncyclopediaPage",
  setup() {
    const wikiStore = useWikiStore()

    onBeforeMount(async() => {
      wikiStore.retrieveWikiPages()
    })

    return {
      wikiStore
    } 
  }
}
</script>