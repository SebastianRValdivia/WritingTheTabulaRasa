<template>
  <q-page padding>
    <div class="row ">
      <div class="col-12">
        <q-table
          :rows=displayedGoals
          row-key="title"
          selection="single"
          v-model:selected="selectedDate"
        >
        </q-table>
        <div class="column col-12 items-center" v-if="selectedDate">
          <h3 class="text-h3">{{ selectedDate[0].title}}</h3>
          <p class="subtitle1">{{ selectedDate[0].result }}</p>
          <q-btn
            icon="navigate_next"
            :to="{name: 'schedulePage', params: {id: selectedDate[0].id}}"
          />
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn 
        icon="add"
        round
        color="primary"
        :to="{name: 'newSchedule'}"        
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, date, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useScheduleStore } from "src/stores/schedule-store"
import { useUserStore } from "src/stores/user-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  name: "SchedulePage",
  setup() {
    const { t } = useI18n()
    const scheduleStore = useScheduleStore()
    const userStore = useUserStore()
    const quasar = useQuasar()

    const objectivesDates = ref([])
    const userSelection = ref("")
    const searchInput = ref("")
    const selectedDate = ref()

    const displayedGoals = computed(() => {
      function formatForDisplay(goalArray) {
        goalArray.forEach((goal, index, goalsArr) => {
          let formatCreatedDate = date.formatDate(goal.created, "MM/DD/YYYY")
          let formatFinishDate = date.formatDate(goal.finish, "MM/DD/YYYY")
          goalsArr[index] = {
            id: goal.id,
            title: goal.title,
            result: goal.result,
            created: formatCreatedDate,
            finish: formatFinishDate,
          }
        })
        return goalArray
      }

      if (searchInput.value) {
        let searchResult = fuzzySearchByObjectByKeys(
          scheduleStore.getGoalsListByUser(userStore.getUserId),
          searchInput.value,
          ["title"],
        )
        return searchResult
      } else {
        return formatForDisplay(
          scheduleStore.getGoalsListByUser(userStore.getUserId)
        )
      }
    })
    const displayedGoalsDates = computed(() => {
      if (displayedGoals.value.length > 0) {
        let goalDates = displayedGoals.value.map((goal) => goal.finish)
        goalDates.forEach((goalDate, goalDateIndex, goalDatesArray) => {
          goalDatesArray[goalDateIndex] = 
            date.formatDate(goalDate, "YYYY/MM/DD")
        })
        return goalDates
      } else return []
    })

    async function loadPage() {
      quasar.loading.show()  
      await scheduleStore.retrieveGoals()
      quasar.loading.hide()
    }

    onBeforeMount(() => {
      loadPage()
    })

    useMeta({
      title: t("schedulePage.pageTitle")
    })

    return {
      displayedGoals,
      displayedGoalsDates,
      userSelection,
      selectedDate,
    }

  }
}
</script>
