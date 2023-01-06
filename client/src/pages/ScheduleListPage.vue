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
        <q-page-sticky position="bottom-right" :offset="[20, 20]">
        <q-btn 
          icon="add"
          round
          color="primary"
          :to="{name: 'newSchedule'}"        
        />
        </q-page-sticky>
      </div>
    </div>
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
    const $q = useQuasar()

    const objectivesDates = ref([])
    const userSelection = ref("")
    const searchInput = ref("")

    const displayedGoals = computed(() => {
      if (searchInput.value) return fuzzySearchByObjectByKeys(
        scheduleStore.getGoalsListByUser(userStore.getUserId),
        searchInput.value,
        ["title"],
      )
      else return scheduleStore.getGoalsListByUser(userStore.getUserId)
    })

    async function loadPage() {
      $q.loading.show()  
      await scheduleStore.retrieveGoals()
      $q.loading.hide()
    }

    onBeforeMount(() => {
      loadPage()
    })

    useMeta({
      title: t("schedulePage.pageTitle")
    })

    return {
      displayedGoals,
      userSelection,
    }

  }
}
</script>
