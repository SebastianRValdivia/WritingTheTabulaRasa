<template>
  <q-page class="q-pa-md" v-if="pageData">
    <div id="header" class="row">
      <h1 class="col col-12 text-h2">{{ pageData.title }}</h1>
      <p class="col col-10 text-h4">{{ pageData.epigraph }}</p>
    </div>

    <q-separator inset />

    <div id="body" class="row">

      <!-- Content -->
      <div class="col col-10">
        <MarkdownPreview :md="pageData.content" />
      </div>
      <!-- Page card -->
      <div class="col col-2">
        <q-card v-if="pageCardData" class="wiki-card">
          <q-img :src="findWikiPageUrl(pageData.image)"/>
          <q-card-section>
            <MarkdownPreview :md="pageCardData.content" />
          </q-card-section>
        </q-card>
        <div>
          <q-list>
            <q-item
              v-for="(section, index) in sections"
              :key="index"
              clickable
              @click="scrollToSection(section)"
            >
              {{ replaceHashs(section) }}
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <div id="footer"></div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta, scroll } from "quasar"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

import api from "src/api"
import { useWikiStore } from "src/stores/wiki-store"
import { useResourceStore } from "src/stores/resource-store"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

export default {
  name: "EncyclopediaPage",
  props: {
    url: String,
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const $q = useQuasar()
    const { getScrollTarget, setVerticalScrollPosition } = scroll
    const { t } = useI18n()
    const $router = useRouter()
    const wikiStore = useWikiStore()
    const resourceStore = useResourceStore()

    const pageData = ref()
    const pageCardData = ref()

    const sections = computed(() => {
      // Finds all lines with # from 1 to 6
      // Returns a list of titles
      let allLinesWithHash = [
        ...pageData.value.content.matchAll(/#{1,6}.+(?=\n)/gm)
      ]
      return allLinesWithHash.map( (section) => section[0] )
    })
    function replaceHashs(stringWithHashes) {
      return stringWithHashes.replaceAll("#", "")
    }

    function findWikiPageUrl(imgId) {
      let imgData = resourceStore.getImageResourceById(imgId)
      if (imgData) return imgData.file
      else return null
    }
    function scrollToSection (els) {
      let el = document.querySelectorAll(replaceHashs(els))[0]
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 500
      setVerticalScrollPosition(target, offset, duration)
    }
    async function loadPage(pageUrl) {
      // Search in the store
      let wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl) 
      // Not in the store, then try api and assign again
      if (wikiFromStore === undefined) {
        await wikiStore.retrieveWikiPageByUrl(pageUrl)
        wikiFromStore = wikiStore.getWikiPageByUrl(pageUrl)
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
        pageCardData.value = cardFromServer.card
      }

    }

    onBeforeMount(async () => {
      $q.loading.show()
      await loadPage(props.url)
      $q.loading.hide()
    })

    useMeta({
      title: "Encyclopedia page",
      titleTemplate: title => `${title} - ${pageData.value.title}`
    })

    return {
      pageData,
      pageCardData,

      sections, 

      replaceHashs,
      scrollToSection,
      findWikiPageUrl,
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
