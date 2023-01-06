<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 column items-center">
        <q-list class="goals-list column" >
          <q-item v-for="goal in scheduleStore.getGoalsList" :key="goal.id">
            {{ goal.title }}: {{ goal.result }} to {{ goal.finish }}
          </q-item>
        </q-list>
        <q-btn 
          label="Add goal"
          :to="{name: 'newSchedule'}"        
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, date, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  name: "SchedulePage",
  setup() {
    const { t } = useI18n()
    const scheduleStore = useScheduleStore()
    const $q = useQuasar()

    const goalsListLength = ref()
    const objectivesDates = ref([])
    const userSelection = ref("")

    onBeforeMount(async () => {
      $q.loading.show()  
      await scheduleStore.retrieveGoals()
      goalsListLength.value = scheduleStore.getGoalsList.length
      await scheduleStore.retrieveObjectives()
      scheduleStore.getObjectivesList.forEach((objective) => {
        objectivesDates.value.push(date.formatDate(objective.date, "YYYY/MM/DD"))
      })
      $q.loading.hide()
    })

    useMeta({
      title: t("schedulePage.pageTitle")
    })

    return {
      scheduleStore,
      goalsListLength,
      userSelection,
      objectivesDates,
    }

  }
}
</script>
