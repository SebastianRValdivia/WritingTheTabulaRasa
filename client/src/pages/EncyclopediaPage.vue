<template>
  <q-page class="q-pa-md">
    <router-view></router-view>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount, onBeforeUnmount } from "vue"
import { useQuasar, useMeta, scroll } from "quasar"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

import { useWikiStore } from "src/stores/wiki-store"
import { useResourceStore } from "src/stores/resource-store"
import { useAppStore } from "src/stores/app-store"

export default {
  name: "EncyclopediaPage",
  props: {
    url: String,
  },
  setup(props) {
    const $q = useQuasar()
    const { getScrollTarget, setVerticalScrollPosition } = scroll
    const { t } = useI18n()
    const router = useRouter()
    const wikiStore = useWikiStore()
    const resourceStore = useResourceStore()
    const appStore = useAppStore()

    async function loadPage(pageUrl) {
      // Search in the store
      let wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(pageUrl)
        wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl)
        if (wikiFromStore === undefined) { // Doesn't exist
          router.push({name: "NotFound"})
        }
      } 

    }

    onBeforeMount(async () => {
      $q.loading.show()
      appStore.setTabs({
        [t("encyclopediaPage.content")]: {
          name: "encyclopediaContentPage",
        },
        [t("encyclopediaPage.discussion")]: {
          name: "encyclopediaDiscussionPage"
        },
        [t("encyclopediaPage.changes")]: {},
        [t("encyclopediaPage.code")]: {},
      })
      $q.loading.hide()
    })

    onBeforeUnmount(() => {
      appStore.setTabs({})
    })

    useMeta({
      title: t("encyclopediaPage.pageTitle"),
      titleTemplate: title => `${title} - ${pageData.value.title}`
    })

    return {
    }
  }
}
</script>

<style>
.wiki-card {
  min-width: 200px;
  max-width: 300px;
  float: right;
}
.wiki-card > h2 {
  border: 1px solid black;
  font-size: 1.5rem;
  line-height: 1;
  text-align: center;
}
</style>
