<template>
  <div>
    Calendar
  </div>
  <div v-if="goalsListLength > 0">
    <q-list class="goals-list" >
      <q-item v-for="goal in scheduleStore.getGoalsList" :key="goal.id">
        {{ goal.title }}: {{ goal.result }} to {{ goal.finish }}
      </q-item>
    </q-list>
    <q-date class="" v-model="newGoalDate" :events="goalsDates">

    </q-date>
  </div>
  <h2 v-else>No goals yet</h2>

</template>

<script>
import { ref, onBeforeMount } from "vue"
import { date } from "quasar"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  setup() {
    const scheduleStore = useScheduleStore()

    const isLoading = ref(false)
    const goalsListLength = ref()
    const goalsDates = ref([])
    const newGoalDate = ref("")



    onBeforeMount(async () => {
      isLoading.value = true
      await scheduleStore.retrieveGoals()
      goalsListLength.value = scheduleStore.getGoalsList.length
      scheduleStore.getGoalsList.forEach((goal) => {
        goalsDates.value.push(date.formatDate(goal.finish, "YYYY/MM/DD"))
      })
    })

    return {
      scheduleStore,
      goalsListLength,
      goalsDates,
      newGoalDate,

    }

  }
}
</script>
