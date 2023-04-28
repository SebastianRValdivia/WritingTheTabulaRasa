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
            {{ hour }}:00
          </td>

          <td 
            v-for="(day, index) in daysCells" 
            :key="index"
            class="cursor-pointer"
          >
            {{ scheduledTask(index, day[hour]) }}
            <q-popup-edit 
              v-model="isPopUpOpen"
              auto-save
              v-slot="scope"
              @hide="createScheduledHour(index, day[hour])"
            >
              <q-input 
                v-model="hourTitleInput" 
                dense 
                autofocus 
                @keyup.enter="scope.set" 
              />
            </q-popup-edit>
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
    const isPopUpOpen = ref(false)
    const hourTitleInput = ref("")

    const daysCodes = Object.freeze({
      monday: "MON",
      thuesday: "TUE",
      wednesday: "WED",
      thursday: "THU",
      friday: "FRI",
      saturday: "SAT",
      sunday: "SUN"
    })
    
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
      // Finds the correct day and time and if it exist in the table returns
      // the title

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
            return findHourTitle(dayHours(daysCodes.monday))
            break
          case 1:
            return findHourTitle(dayHours(daysCodes.thuesday))
            break
          case 2:
            return findHourTitle(dayHours(daysCodes.wednesday))
            break
          case 3:
            return findHourTitle(dayHours(daysCodes.thursday))
            break;
          case 4:
            return findHourTitle(dayHours(daysCodes.friday))
            break
          case 5:
            return findHourTitle(dayHours(daysCodes.saturday))
            break
          case 6:
            return findHourTitle(dayHours(daysCodes.sunday))
            break
          default:
            return null
            break;
      }
    }
    async function createScheduledHour(dayIndex, hourInteger) {
      const hourForApi = () => { // TODO: mv to utils
        // day doesnt matter here its just a required parameter
        return new Date("1985", "10", "26", hourInteger)
          .toLocaleTimeString('en-US', {
            hour: 'numeric', minute: 'numeric', hour12: false,
          })
      }
      let result = await scheduleStore.createHour(
        Object.values(daysCodes)[dayIndex], // Treat dic as list and uses number
        hourForApi(hourInteger),
        activeTable.value.id,
        hourTitleInput.value,
      )
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
      isPopUpOpen,
      hourTitleInput,

      scheduledTask,
      createScheduledHour,
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
  text-align: center;
  border: 1px solid black;
}
</style>
