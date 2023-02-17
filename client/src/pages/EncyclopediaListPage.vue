<template>
  <q-page padding>
    <SearchInput @search="searchPages" />
    <q-list>
      <q-item 
        v-for="wikiPage in displayedPages" 
        :key="wikiPage.id"
        class="row justify-center"
      >
        <q-card 
          class="col-12 row justify-between scoped-wiki-card"
        >
          <div class="col-7 column q-pl-xl q-pt-lg">
            <h4 class="col-6 text-h4 q-mt-md q-mb-sm">
              {{ wikiPage.title }}
            </h4>
            
            <p class="text-subtitle1">
              {{ wikiPage.epigraph}}
            </p>
          </div>
          <div class="col-4 column justify-center">
            <q-img
              v-if="wikiPage.image"
              :src="findWikiPageUrl(wikiPage.image)"
              width="12rem"
              height="12rem"
              ratio="1"
              fit="contain"
            />
          </div>
          <q-card-actions>
            <q-btn 
              icon="launch"
              :to="{name: 'encyclopediaPage', params:{url: wikiPage.url}}"
            />
          </q-card-actions>
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
