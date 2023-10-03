<template>
  <pre class="scoped-code-display">
    <code>
      {{ pageData.content }}
    </code>
  </pre>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"

export default {
  name: "EncyclopediaCodePage",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const quasar = useQuasar()
    const wikiStore = useWikiStore()

    const pageData = ref({})

    async function loadPage(pageUrl) {
      // Search in the store
      let wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(pageUrl)
        wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl)
        if (wikiFromStore === undefined) { // Doesn't exist
          router.push({name: "NotFound"})
          return 0
        }
        pageData.value = wikiFromStore
      } else pageData.value = wikiFromStore
    }
    onBeforeMount(async () => {
      quasar.loading.show()
      await loadPage(props.url)
      quasar.loading.hide()
    })

    return {
      pageData
    }
  }
}
</script>

<style>
pre {
  white-space: pre-wrap;
  white-space: -o-pre-wrap;/* Opera 7 */
}
</style>
