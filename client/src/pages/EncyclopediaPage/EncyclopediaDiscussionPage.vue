<template>
  <div class="row justify-center q-gutter-md">
    <div 
      v-for="post in postList"
      :key="post.id"
      class="col col-9 scoped-post row"
    >
      <div class="col col-2">
        <UserBadge :user="post.owner" />
      </div>
      <div class="col col-7">
        {{ post.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import api from "src/api"
import { useWikiStore } from "src/stores/wiki-store"
import UserBadge from "src/components/for-viewing/UserBadge"

export default {
  name: "EncyclopediaDiscussionPage",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  components: {
    UserBadge,
  },
  setup(props) {
    const quasar = useQuasar()
    const wikiStore = useWikiStore()

    const postList = ref([])
    
    async function loadPage(pageUrl) {
      // Search in the store
      let pageData 
      let wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(pageUrl)
        wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl)
        if (wikiFromStore === undefined) { // Doesn't exist
          router.push({name: "NotFound"})
        } else {
          pageData = wikiFromStore
        }
      } else {
        pageData = wikiFromStore
      }
      let result = await api.wiki.getWikiDiscussionPostsByPageId(pageData.id)

      postList.value = result.data
    }
    onBeforeMount(async () => {
      quasar.loading.show()
      await loadPage(props.url)
      quasar.loading.hide()
    })

    return {
      postList
    }
  }
}
</script>

<style scoped>
.scoped-post {
  border: 1px solid black;
  min-height: 5rem;
}
</style>
