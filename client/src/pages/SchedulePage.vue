<template>
  <q-page v-if="goalsListLength > 0" >
    <div class="row q-pa-sm">
      <q-date 
        v-model="userSelection" 
        :events="objectivesDates" 
        class="column col-5"
      />
      <q-list class="column q-ml-md col-6" bordered separator>
        <q-item 
          v-for="objective in scheduleStore.getObjectivesList" 
          :key="objective.id"
          class="clickable"
        >
          <q-item-section>
            {{ objective.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row">
      <q-list class="goals-list column" >
        <q-item v-for="goal in scheduleStore.getGoalsList" :key="goal.id">
          {{ goal.title }}: {{ goal.result }} to {{ goal.finish }}
        </q-item>
      </q-list>
    </div>
  </q-page>
  <h2 v-else-if="goalsListLength === 0">{{ $t("schedulePage.empty")}}</h2>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, date } from "quasar"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  setup() {
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

    return {
      scheduleStore,
      goalsListLength,
      userSelection,
      objectivesDates,
    }

  }
}
</script>
