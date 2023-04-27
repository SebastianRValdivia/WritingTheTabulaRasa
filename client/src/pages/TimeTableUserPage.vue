<template>
  <q-page padding>
    {{ activeTableHours }}
    {{ activeTable}}
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  name: "TimeTableUserPage",
  setup() {
    const quasar = useQuasar()
    const scheduleStore = useScheduleStore()

    const activeTable = ref([])
    const activeTableHours = ref([])

    onBeforeMount(async () => {
      quasar.loading.show()

      let result = await scheduleStore.retrieveUserTimeTables()
      if (result) {
        activeTable.value = scheduleStore.getUserActiveTimeTable
        result = await scheduleStore.retrieveUserHours()
        if (result && activeTable.value) {
          activeTableHours.value = scheduleStore.getUserHoursByTable(
            activeTable.value.id
          )
          quasar.loading.hide()
        }
      }
    })


    return {
      activeTable,
      activeTableHours,
    }
  }
}
</script>
