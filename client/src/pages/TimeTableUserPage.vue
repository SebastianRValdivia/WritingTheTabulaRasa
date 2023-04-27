<template>
  <q-page padding class="row justify-center">
    <q-select
      filled
      v-model="activeTable"
      option-label="title"
      class="col-6"
    />
    <table class="col-10 scoped-time-table">
      <thead>
        <tr>
          <th>
            {{ $t("timeTableUserPage.hours") }}
          </th>
          <th
            v-for="(day, index) in daysLabel"
            :key="index"
          >
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(hour, index) in hours"
          :key="index"
        >
          <td>
            {{ hour }}
          </td>
        </tr>
      </tbody>
    </table>
    
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  name: "TimeTableUserPage",
  setup() {
    const quasar = useQuasar()
    const scheduleStore = useScheduleStore()
    const { t } = useI18n()

    const activeTable = ref([])
    const activeTableHours = ref([])
    const daysLabel = ref([
      t("timeTableUserPage.monday"),
      t("timeTableUserPage.thuesday"),
      t("timeTableUserPage.wednesday"),
      t("timeTableUserPage.thursday"),
      t("timeTableUserPage.friday"),
      t("timeTableUserPage.saturday"),
      t("timeTableUserPage.sunday"),
    ])
    const hours = ref(generateHours())
    
    function generateHours() {
      let hoursPerDay = 24 // To be change by user config
      return Array.from(Array(hoursPerDay).keys())
    }
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
      daysLabel,
      hours,
    }
  }
}
</script>

<style scoped>
.scoped-time-table {
}
</style>
