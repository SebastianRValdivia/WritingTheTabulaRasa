<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 column items-center">
        <q-list class="goals-list column" >
          <q-item v-for="goal in displayedGoals" :key="goal.id">
            <router-link :to="{name: 'schedulePage', params: {id: goal.id}}">
              {{ goal.title }}: {{ goal.result }} to {{ goal.finish }}
            </router-link>
          </q-item>
        </q-list>
        <q-date
          v-model="selectedDate"
          :events="displayedGoalsDates"
        />
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
      if (searchInput.value) return fuzzySearchByObjectByKeys(
        scheduleStore.getGoalsListByUser(userStore.getUserId),
        searchInput.value,
        ["title"],
      )
      else return scheduleStore.getGoalsListByUser(userStore.getUserId)
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
