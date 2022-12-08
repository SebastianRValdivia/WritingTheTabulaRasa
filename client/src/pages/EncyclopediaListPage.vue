<template>
  <q-page>
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
    <q-page-sticky
      position="bottom-right"
      :offset="[10, 10]"
    >
      <q-btn round icon="add" size="md" color="primary" :to="{name: 'encyclopediaEditor'}"/>
    </q-page-sticky>

  </q-page>
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
