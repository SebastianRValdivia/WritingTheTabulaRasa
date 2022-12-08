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
import { useI18n } from "vue-i18n"
import { useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"

export default {
  name: "EncyclopediaListPage",
  setup() {
    const { t } = useI18n()
    const wikiStore = useWikiStore()

    onBeforeMount(async() => {
      wikiStore.retrieveWikiPages()
    })

    useMeta({
      title: t("encyclopediaListPage.pageTitle")
    })

    return {
      wikiStore
    } 
  }
}
</script>
