<template>
  <q-page class="q-mg-md">
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
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useGuidesStore } from "src/stores/guide-store"
export default {

  setup() {
    const guideStore = useGuidesStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const displayedGuidesList = ref([])

    onBeforeMount(async () => {

      quasar.loading.show()

      let result = await guideStore.retrieveGuides()

      if (result) {
        displayedGuidesList.value = guideStore.getGuidesList
        quasar.loading.hide()
      }
    })

    useMeta({
      title: t("guidesListPage.pageTitle"),
    })
    return {
      displayedGuidesList,
    }
  }

}

</script>

<style lang="scss" scoped>
</style>
