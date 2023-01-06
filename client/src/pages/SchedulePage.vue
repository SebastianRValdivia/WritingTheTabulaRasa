<template>
  <q-page padding v-if="goalData">
    <div class="row justify-center">
      <h3 class="text-h3">#{{ goalData.id }} {{ goalData.title }}</h3>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { onBeforeRouteUpdate } from "vue-router"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  name: "SchedulePage",
  props: {
    id: String
  },
  setup(props) {
    const scheduleStore = useScheduleStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const goalData = ref()

    async function loadPage(goalId) {
      quasar.loading.show()
      goalData.value = scheduleStore.getGoalById(goalId)

      if (!goalData.value) {
        let result = await scheduleStore.retrieveGoalById(goalId)
        if (result) goalData.value = scheduleStore.getGoalById(goalId)
      }
      quasar.loading.hide()
    }

    onBeforeMount(() => {
      loadPage(Number(props.id))
    })
    onBeforeRouteUpdate((to) => {
      loadPage(Number(to.params.id))
    })

    useMeta({
      title: t("cheatSheetPage.pageTitle"),
    })

    return {
      goalData,
    }
  }
}
</script>
