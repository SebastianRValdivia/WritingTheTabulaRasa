<template>
  <div>
    Calendar
  </div>
  <q-list class="goals-list" v-if="goalsListLength > 0">
    <q-item v-for="goal in scheduleStore.getGoalsList" :key="goal.id">
      {{ goal }}
    </q-item>
  </q-list>
  <h2 v-else>No goals yet</h2>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  setup() {
    const scheduleStore = useScheduleStore()

    const isLoading = ref(false)
    const goalsListLength = ref()



    onBeforeMount(async () => {
      isLoading.value = true
      await scheduleStore.retrieveGoals()
      goalsListLength.value = scheduleStore.getGoalsList.length
    })

    return {
      scheduleStore,
      goalsListLength,
    }

  }
}
</script>
