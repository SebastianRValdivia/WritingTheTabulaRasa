<template>
  <q-page padding>
    <SearchInput @search="searchPages" />
    <q-list>
      <q-item
        v-for="wikiPage in displayedPages"
        :key="wikiPage.id"
        class="column items-center"
      >
        <q-card
          class="col col-12 scoped-wiki-card overflow-hidden"
        >
          <q-card-section class="row">
            <span class="col col-6 text-h4">
              {{ wikiPage.title }}
            </span>

            <p class="col col-8 ">
              {{ wikiPage.epigraph }}
            </p>
            <q-img
              v-if="wikiPage.image"
              :src="findWikiPageUrl(wikiPage.image)"
              width="12rem"
              height="12rem"
              ratio="1"
              fit="contain"
            />
            <q-btn
              icon="launch"
              class="absolute-right"
              flat
              :to="{
                name: 'encyclopediaContentPage',
                params:{url: wikiPage.url}
              }"
            />
          </q-card-section>
        </q-card>
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
import { ref, computed, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"
import { useResourceStore } from "src/stores/resource-store"
import SearchInput from "src/components/for-input/SearchInput"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  name: "EncyclopediaListPage",
  components: {
    SearchInput
  },
  setup() {
    const { t } = useI18n()
    const wikiStore = useWikiStore()
    const resourceStore = useResourceStore()
    const quasar = useQuasar()

    const searchPattern = ref("")

    const displayedPages = computed(() => {
      if (searchPattern.value) {
        return fuzzySearchByObjectByKeys(
          wikiStore.getWikiPageList,
          searchPattern.value,
          ['title', 'epigraph']
        )
      } else {
        return wikiStore.getWikiPageList
      }
    })


    function searchPages(pattern) {
      searchPattern.value = pattern
    }
    function findWikiPageUrl(imgId) {
      let imgData = resourceStore.getImageResourceById(imgId)
      if (imgData) return imgData.file
      else return null
    }
    async function loadPage() {
      let result = await wikiStore.retrieveWikiPages()
      if (result) result = await resourceStore.retrieveImageResources()
    }

    onBeforeMount(async() => {
      quasar.loading.show()
      await loadPage()
      quasar.loading.hide()
    })

    useMeta({
      title: t("encyclopediaListPage.pageTitle")
    })
    return {
      wikiStore,

      displayedPages,

      findWikiPageUrl,
      searchPages,
    }
  }
}
</script>

<style lang="scss" scoped>
.scoped-wiki-card {
  min-height: 15rem;
  max-height: 15rem;
  min-width: 70%;
  max-width: 70%;
}
.scoped-wiki-card-image {
  min-height: 12rem;
  max-height: 12rem;

}
</style>
