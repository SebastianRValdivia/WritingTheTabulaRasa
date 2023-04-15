<template>
  <q-page padding class="row" v-if="practiceRoutineData">
    <h3 class="text-h3 col-12">
      {{ practiceRoutineData.title }}
    </h3>
    
    <div class="col-12 column items-center">
      <q-btn
        color="positive"
        :label="$t('practiceRoutineUserPage.doNow')"
        :to="{name: 'practiceRoutinePage', params: {id: practiceRoutineData.id}}"
      />
    </div>
    
    <q-table
      class="col-12"
      :columns="completionsTableColumns"
      :rows="completionsList"
    ></q-table>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"

import { usePracticeStore } from "src/stores/practice-store"

export default {
  name: "PracticeRoutineUserPage",
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const quasar = useQuasar()
    const practiceStore = usePracticeStore()
    const router = useRouter()

    const practiceRoutineData = ref()
    const completionsList = ref()
    const completionsTableColumns = [
      {
        name: "routineId",
        required: true,
        label: "Routine ID",
        field: row => row.id,
      },
      {
        name: "completion",
        required: true,
        label: "Completion Date",
        field: row => row.updated,
      }
    ]

    onBeforeMount(async () => {
      async function retrieveCompletions() {
        let result = await practiceStore.retrieveUserCompletedPracticeRoutines()
        if (result) {
          completionsList.value = practiceStore.
            getUserPracticeRoutineCompletionsByRoutineId(
              routineId
            )
          return true
        } else return false
      }
      quasar.loading.show()
      const routineId = Number(props.id) // Convert to int

      practiceRoutineData.value = practiceStore.getPracticeRoutineById(
        routineId
      )
      // If is false is not in the store so tries to retrieve
      if (!practiceRoutineData.value) {
        let result = await practiceStore.retrievePracticeRoutine(routineId)
        if (result) {
          practiceRoutineData.value = practiceStore.getPracticeRoutineById(
            routineId
          )
          let retrieveCompletionsResult = await retrieveCompletions()
        } else {
          // It does not exist
          router.push({name: "notFound"})
        }
      } else {
        let retrieveCompletionsResult = await retrieveCompletions()
      }
      quasar.loading.hide()
    })

    return {
      practiceRoutineData,
      completionsList,
      completionsTableColumns,
    }
  }
}
</script>
