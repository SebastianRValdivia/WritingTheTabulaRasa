<template>
  <q-list>
    <q-item 
      v-for="wikiPage in wikiStore.getWikiPageList" 
      :key="wikiPage.id"
      :to="{name: 'encyclopediaPage', params:{title: wikiPage.url}}"
    >
      {{ wikiPage.title }}
      <q-tooltip>
        {{ wikiPage.epigraph}}
      </q-tooltip>
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