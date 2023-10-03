<template>
  <div id="header" class="row">
    <h1 class="col col-12 text-h2">{{ pageData.title }}</h1>
    <p class="col col-10 text-h4">{{ pageData.epigraph }}</p>
  </div>

  <q-separator inset />

  <div id="body" class="row">

    <!-- Content -->
    <div class="col col-10" id="content">
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
            v-for="(section, index) in pageSections"
            :key="index"
            clickable
            @click="scrollToSection(section)"
          >
            {{ section.innerText }}
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <div id="footer"></div>
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
  name: "EncyclopediaContentPage",
  components: {
    MarkdownPreview
  },
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const $q = useQuasar()
    const { getScrollTarget, setVerticalScrollPosition } = scroll
    const { t } = useI18n()
    const router = useRouter()
    const wikiStore = useWikiStore()
    const resourceStore = useResourceStore()

    const pageData = ref("")
    const pageCardData = ref()
    const pageSections = ref()

    function getSections() {
      const pageContentElement = document.getElementById("content")
      pageSections.value = pageContentElement.getElementsByTagName("h1")
    }

    function findWikiPageUrl(imgId) {
      let imgData = resourceStore.getImageResourceById(imgId)
      if (imgData) return imgData.file
      else return null
    }
    function scrollToSection (el) {
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
          router.push({name: "NotFound"})
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
      getSections()
      $q.loading.hide()
    })

    return {
      pageData,
      pageCardData,

      pageSections, 

      scrollToSection,
      findWikiPageUrl,
    }
  }
}
</script>
