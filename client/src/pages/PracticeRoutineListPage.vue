<template>
  <q-page padding>
    <SearchInput @search="searchPracticeRoutines"/>
    <div class="row q-gutter-md">
      <q-card
        v-for="practiceRoutine in displayedPracticeRoutines"
        :key="practiceRoutine.id"
        class="col"
      >
        <q-card-section class="row">
          <h5 class="text-h5 col col-8">{{ practiceRoutine.title }}</h5>
          <div v-if="userStore.isUserLogged">
            <p 
              class="col col-2"
              v-if="isUserAssignedToRoutine(practiceRoutine.id)"
            > {{ $t("practiceRoutineListPage.enlisted") }}</p>
            <q-btn 
              v-else
              icon="add_box"
              class="col col-2"
              @click="enlist(practiceRoutine.id)"
            />
          </div>
          <q-btn 
            
          />
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { usePracticeStore } from "src/stores/practice-store"
import { useUserStore } from "src/stores/user-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"
import SearchInput from "src/components/for-input/SearchInput"

export default {
  name: "PracticeRoutineListPage",
  components: {
    SearchInput,
  },
  setup() {
    const practiceStore = usePracticeStore()
    const userStore = useUserStore()
    const quasar = useQuasar()

    const searchPattern = ref("")
    const userPracticeRoutines = ref([])

    const displayedPracticeRoutines = computed(() => {
      if (searchPattern.value) {
        return fuzzySearchByObjectByKeys(
          practiceStore.getPracticeRoutines,
          searchPattern.value,
          ["title"]
        )
      } else {
        return practiceStore.getPracticeRoutines
      }
      
    })

    function searchPracticeRoutines(pattern) {
      searchPattern.value = pattern
    }
    function isUserAssignedToRoutine(routineId) {
      // Search if there is an element in the list
      // If there is the index will be > -1
      let index = userPracticeRoutines.value.findIndex((practiceRoutine) => {
        return practiceRoutine.routine === routineId
      })
      return index !== -1
    }
    async function enlist(routineId) {
      let result = 
        await practiceStore.createAssignedPracticeRoutineToUser(routineId)
    }

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await practiceStore.retrievePracticeRoutines()
      let resultUserPracticeRoutines = 
        await practiceStore.retrieveAssignedPracticeRoutines()
      userPracticeRoutines.value = 
        practiceStore.getAssignedPracticeRoutinesByUser(userStore.getUserId)
      if (result) {
        quasar.loading.hide()
      }
    })

    return {
      userStore,
      searchPattern,

      displayedPracticeRoutines,

      searchPracticeRoutines,
      isUserAssignedToRoutine,
      enlist,
    }
    
  }
}
</script>
