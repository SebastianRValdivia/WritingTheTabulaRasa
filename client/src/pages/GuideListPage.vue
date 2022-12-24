<template>
  <q-page class="q-pa-md">
    <div class="col-12 row justify-center">
      <q-input 
        rounded
        outlined
        v-model="searchInput"
        class="col-4"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-list>
      <q-item 
        v-for="guideData in displayedGuidesList"
        :key="guideData.id" 
        v-ripple
        clickable
        :to="{name: 'guidePage', params: {url: guideData.url}}"
      >
        <q-item-section>
          <q-item-label overline> #{{ guideData.id }}</q-item-label>
          <q-item-label class="text-h4"> {{ guideData.title }}</q-item-label>
          <q-item-label caption> {{ guideData.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky 
      v-if="userStore.isUserLogged"
      position="top-right"
      :offset="[20, 20]"
    >
      <q-btn 
        round 
        icon="add"
        color="primary"
        :to="{name: 'guideEditor'}"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import Fuse from "fuse.js"

import { useGuideStore } from "src/stores/guide-store"
import { useUserStore } from "src/stores/user-store"

export default {

  setup() {
    const guideStore = useGuideStore()
    const userStore = useUserStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const searchInput = ref("")
    const displayedGuidesList = computed(() => {
      if (searchInput.value) return searchGuide(searchInput.value)
      else return guideStore.getGuidesList
    })

    function searchGuide(searchPattern) {
      let fuzzySearch = new Fuse(
        guideStore.getGuidesList,
        {
          keys: [
            "title",
            "description",
          ]
        }
      )
      return fuzzySearch
        .search(searchPattern)
        .map((item) => item.item)
    }


    onBeforeMount(async () => {

      quasar.loading.show()

      let result = await guideStore.retrieveGuides()

      if (result) {
        quasar.loading.hide()
      }
    })

    useMeta({
      title: t("guidesListPage.pageTitle"),
    })
    return {
      displayedGuidesList,
      searchInput,
      userStore,
    }
  }

}

</script>

<style lang="scss" scoped>
</style>
