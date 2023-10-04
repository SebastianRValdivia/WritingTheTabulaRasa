<template>
  <q-page class="q-pa-md">
    <SearchInput @search="searchGuides"/>
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

import { useGuideStore } from "src/stores/guide-store"
import { useUserStore } from "src/stores/user-store"
import SearchInput from "src/components/for-input/SearchInput.vue"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  name: "GuideListPage",
  components: {
    SearchInput
  },
  setup() {
    const guideStore = useGuideStore()
    const userStore = useUserStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const searchInput = ref("")
    const displayedGuidesList = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          guideStore.getGuidesList,
          searchInput.value,
          ["title", "description"]
        )
      } else return guideStore.getGuidesList
    })

    function searchGuides(searchPattern) {
      searchInput.value = searchPattern
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
      userStore,

      displayedGuidesList,

      searchGuides,
    }
  }

}

</script>

<style lang="scss" scoped>
</style>
