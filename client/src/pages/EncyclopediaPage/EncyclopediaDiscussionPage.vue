<template>
  <div class="row justify-center q-gutter-md">
    <div class="col col-10">
      <h5 class="text-h5">
        {{ $t('encyclopediaDiscussionPage.discussionFor') }}
        {{ pageData.title }}
      </h5>
    </div>
    <q-card 
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
    </q-card>
    <q-card class="col col-9 row scoped-post-input q-mt-xl">
      <div class="col col-2">
        <UserBadge loggedUser />
      </div>
      <div class="col col-9">
        <q-input 
          autogrow
          v-model="newPostInput"
          :label="$t('encyclopediaDiscussionPage.continueConversation')"
        />
      </div>
      <q-card-actions align="right" class="absolute-bottom">
        <q-btn 
          icon="done"
          @click="submitPost"
        />
      </q-card-actions>
    </q-card>
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

    const pageData = ref({})
    const postList = ref([])
    const newPostInput = ref("")
    
    async function submitPost() {
      let postData = {
        content: newPostInput.value,
        pg: pageData.value.id
      }
      let result = await api.wiki.postWikiDiscussionPost(postData)

      if (result) {
        postList.value.push(result.data)
      } else {
        console.log("error") // TODO replace with notify
      }
    }
    async function loadPage(pageUrl) {
      // Search in the store
      let wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(pageUrl)
        wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl)
        if (wikiFromStore === undefined) { // Doesn't exist
          router.push({name: "NotFound"})
        } else {
          pageData.value = wikiFromStore
        }
      } else {
        pageData.value = wikiFromStore
      }
      let result = await api.wiki.getWikiDiscussionPostsByPageId(
        pageData.value.id
      )

      postList.value = result.data
    }
    onBeforeMount(async () => {
      quasar.loading.show()
      await loadPage(props.url)
      quasar.loading.hide()
    })

    return {
      postList,
      newPostInput,
      pageData,

      submitPost,
    }
  }
}
</script>

<style scoped>
.scoped-post {
  min-height: 5rem;
}
.scoped-post-input {
  border: 1px solid black;
  min-height: 8rem;
}
</style>
