<template>
  <q-page v-if="pageData">
    <h1>{{ pageData.title }}</h1>
    <h4>{{ pageData.epigraph }}</h4>

    <MarkdownPreview :md="pageData.content" />
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

import { useWikiStore } from "src/stores/wiki-store"
import MarkdownPreview from "src/components/MarkdownPreview"

export default {
  props: {
    title: String,
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const $q = useQuasar()
    const $router = useRouter()
    const wikiStore = useWikiStore()

    const pageData = ref()

    onBeforeMount(async () => {
      $q.loading.show()
      let wikiFromStore = wikiStore.getWikiPageByUrl(props.title) // Search in the store
      if (wikiFromStore === undefined) { // Not in the store, then try api and assign again
        await wikiStore.retrieveWikiPageByUrl(props.title)
        wikiFromStore = wikiStore.getWikiPageByUrl(props.title)
        if (wikiFromStore === undefined) { // Doesn't exist
          $router.push({name: "NotFound"})
        } else {
          pageData.value = wikiFromStore
        }
      }
      $q.loading.hide()
    })

    return {
      props,
      pageData,

    }
  }
}
</script>