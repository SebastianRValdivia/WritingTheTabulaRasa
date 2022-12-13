<template>
  <q-page>
    <q-list>
      <q-item 
        v-for="wikiPage in displayedPages" 
        :key="wikiPage.id"
        :to="{name: 'encyclopediaPage', params:{title: wikiPage.url}}"
        class="row"
      >
        <q-card class="col-12 row scoped-wiki-card">
          <div class="col-7">
            <h4 class="col-6 text-h4 q-mt-md q-mb-sm">
              {{ wikiPage.title }}
            </h4>
            
            {{ wikiPage.epigraph}}
          </div>
          <div class="col-4">
            <q-img
              v-if="wikiPage.image"
              :src="wikiPage.image"
              class="scoped-wiki-card-image"
              ratio="1"
              fit="contain"
            />
          </div>
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
import { ref, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useWikiStore } from "src/stores/wiki-store"
import api from "src/api"

export default {
  name: "EncyclopediaListPage",
  setup() {
    const { t } = useI18n()
    const wikiStore = useWikiStore()
    const quasar = useQuasar()

    const displayedPages = ref([])

    async function generateWikiPageImgUrl(imgId) {
      if (imgId) {
        let result = await api.resources.getImageResourceById(imgId)
        if (result) {
          return result.data.file
        } else return null
      } else return null
    }

    async function generatePageImagesUrl() {
      for (let page of displayedPages.value) {
        page.image = await generateWikiPageImgUrl(page.image)
      }
      return true
    }

    onBeforeMount(async() => {
      quasar.loading.show()
      let result = await wikiStore.retrieveWikiPages()
      if (result) {
        displayedPages.value = wikiStore.getWikiPageList
        result = await generatePageImagesUrl()
        if (result) {
          quasar.loading.hide()
        }
      }
    })

    useMeta({
      title: t("encyclopediaListPage.pageTitle")
    })
    return {
      wikiStore,
      displayedPages,
      generateWikiPageImgUrl,
    } 
  }
}
</script>

<style lang="scss" scoped>
.scoped-wiki-card {
  min-height: 15rem;
  max-height: 15rem;
}
.scoped-wiki-card-image {
  min-height: 10rem;
  max-height: 10rem;

}
</style>
