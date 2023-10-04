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
          <q-card-section class="fit row">
            <div class="col col-6 text-h3 q-mb-md">
              {{ wikiPage.title }}
            </div>
            <div class="col col-8">
              <p class="text-subtitle1">
                {{ wikiPage.epigraph }}
              </p>
            </div>
            <q-img
              v-if="wikiPage.image"
              :src="findWikiPageUrl(wikiPage.image)"
              width="12rem"
              height="12rem"
              ratio="1"
              fit="contain"
            />
          </q-card-section>
          <q-btn
            icon="launch"
            class="absolute-right"
            flat
            :to="{
              name: 'encyclopediaContentPage',
              params:{url: wikiPage.url}
            }"
          />
        </q-card>
      </q-item>
    </q-list>
    <AddNewBtn :to="{name: 'encyclopediaEditor'}"/>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"
import { useImageStore } from "src/stores/image-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"
import SearchInput from "src/components/for-input/SearchInput.vue"
import AddNewBtn from "src/components/for-input/AddNewBtn.vue"

export default {
  name: "EncyclopediaListPage",
  components: {
    SearchInput,
    AddNewBtn,
  },
  setup() {
    const { t } = useI18n()
    const wikiStore = useWikiStore()
    const imageStore = useImageStore()
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
      let imgData = imageStore.getImageById(imgId)
      if (imgData) return imgData.file
      else return null
    }
    async function loadPage() {
      let result = await wikiStore.retrieveWikiPages()
      if (result) result = await imageStore.retrieveImages()
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
