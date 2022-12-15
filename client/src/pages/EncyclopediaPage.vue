<template>
  <q-page class="q-pa-md" v-if="pageData">
    <div id="header" class="row">
      <h2 class="col-12">{{ pageData.title }}</h2>
      <h4 class="col-10">{{ pageData.epigraph }}</h4>
      <q-card v-if="pageCard" class=" col-2 wiki-card">
        <q-img :src="pageData.image"/>
        <q-card-section>
          <MarkdownPreview :md="pageCard.content" />
        </q-card-section>
      </q-card>
    </div>

    <q-separator inset />

    <div id="body" class="row">
      <MarkdownPreview :md="pageData.content" />
    </div>

    <div id="footer"></div>

  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

import api from "src/api"
import { useWikiStore } from "src/stores/wiki-store"
import MarkdownPreview from "src/components/MarkdownPreview"

export default {
  name: "EncyclopediaPage",
  props: {
    title: String,
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const $q = useQuasar()
    const { t } = useI18n()
    const $router = useRouter()
    const wikiStore = useWikiStore()

    const pageData = ref()
    const pageCard = ref()

    onBeforeMount(async () => {
      $q.loading.show()
      // Search in the store
      let wikiFromStore = wikiStore.getWikiPageByUrl(props.title) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(props.title)
        wikiFromStore = wikiStore.getWikiPageByUrl(props.title)
        if (wikiFromStore === undefined) { // Doesn't exist
          $router.push({name: "NotFound"})
        } else {
          pageData.value = wikiFromStore
        }
      } else {
        pageData.value = wikiFromStore
      }

      let cardFromServer = await api.wiki.getWikiCardByPageId(pageData.value.id)
      if (cardFromServer.code === 200) {
        pageCard.value = cardFromServer.card
      }
      $q.loading.hide()
    })

    useMeta({
      title: "Encyclopedia page",
      titleTemplate: title => `${title} - ${pageData.value.title}`
    })

    return {
      props,
      pageData,
      pageCard,
    }
  }
}
</script>

<style>
.wiki-card {
  min-width: 350px;
  max-width: 400px;
}
.wiki-card > h2 {
  border: 1px solid black;
  font-size: 1.5rem;
  line-height: 1;
  text-align: center;
}
</style>
