<template>
  <q-page padding>
    <SearchInput @search="searchPracticeRoutines"/>
    <div class="row q-ma-xl">
      <q-card
        v-for="practiceRoutine in displayedPracticeRoutines"
        :key="practiceRoutine.id"
        class="col col"
      >
        <q-card-section>
          <h4 class="text-h4">{{ practiceRoutine.title }}</h4>
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
import { fuzzySearchByObjectByKeys } from "src/utils/search"
import SearchInput from "src/components/for-input/SearchInput"

export default {
  name: "PracticeRoutineListPage",
  components: {
    SearchInput,
  },
  setup() {
    const practiceStore = usePracticeStore()
    const quasar = useQuasar()

    const searchPattern = ref("")

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

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await practiceStore.retrievePracticeRoutines()
      if (result) {
        quasar.loading.hide()
      }
    })

    return {
      searchPattern,

      displayedPracticeRoutines,

      searchPracticeRoutines,
    }
    
  }
}
</script>
