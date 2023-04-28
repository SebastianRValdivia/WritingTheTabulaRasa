<template>
  <q-page padding class="row justify-center">
    <q-select
      filled
      v-model="activeTable"
      option-label="title"
      class="col-6 q-mb-sm"
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
          v-for="(hour, index) in hoursLabels"
          :key="index"
        >
          <td>
            {{ hour }}
          </td>

          <td 
            v-for="(day, index) in daysCells" 
            :key="index"
          >
            {{ scheduledTask(index, day[hour]) }}
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
    const hoursLabels = ref(Array.from(Array(24).keys()))
    const daysCells = ref(generateHoursCells())

    
    function generateHoursCells() {
      let hoursPerDay = 24 // To be change by user config
      let daysPerWeek = 7 // I hope it doesnt change

      let hours = Array.from(Array(hoursPerDay).keys())
      // Generate an hoursPerDayxdaysPerWeek
      let week = Array.from(
        Array(daysPerWeek).keys(),
        () => hours
      )

      return week
    }
    function scheduledTask(day, time) {
      // forgive me for what i am about to do

      // Convert api format to a single number
      const hourToDecimal = (hour) => {
        let arr = hour.split(':')
        let dec = parseInt((arr[1]/6)*10, 10)
        return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec)
      }   

      // Find a list of hours according to the day 
      const dayHours = (dayCode) => {
        return activeTableHours.value.filter( (hour) => hour.day === dayCode )
      }

      // Search the hour list for the correct hour and its title
      const findHourTitle = (hours) => {
        for (let hour of hours) {
          let apiTimeAsDecimal = hourToDecimal(hour.time) 
          if (apiTimeAsDecimal === time) {
            return hour.title
          }
        }
      }
      // Check for the day code and return the title
      switch (day) {
          case 0:
            return findHourTitle(dayHours("MON"))
            break
          case 1:
            return findHourTitle(dayHours("TUE"))
            break
          case 2:
            return findHourTitle(dayHours("WED"))
            break
          case 3:
            return findHourTitle(dayHours("THU"))
            break;
          case 4:
            return findHourTitle(dayHours("FRI"))
            break
          case 5:
            return findHourTitle(dayHours("SAT"))
            break
          case 6:
            return findHourTitle(dayHours("SUN"))
            break
          default:
            return null
            break;
      }
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
      hoursLabels,
      daysCells,

      scheduledTask,
    }
  }
}
</script>

<style scoped>
.scoped-time-table {
  border: 1px solid black;
  border-collapse: collapse;
}
.scoped-time-table th {
  border: 2px solid black;
}
.scoped-time-table td {
  border: 1px solid black;
}
</style>
