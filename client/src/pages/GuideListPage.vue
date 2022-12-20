<template>
  <q-page class="q-mg-md">
  {{displayedGuides}}
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

    const displayedGuides = ref([])

    onBeforeMount(async () => {

      quasar.loading.show()

      let result = await guideStore.retrieveGuides()

      if (result) {
        displayedGuides.value = guideStore.getGuidesList
        quasar.loading.hide()
      }
    })

    useMeta({
      title: t("guidesListPage.pageTitle"),
    })
    return {
      displayedGuides,
    }
  }

}

</script>
