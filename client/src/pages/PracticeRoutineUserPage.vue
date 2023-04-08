<template>
  <h3 class="text-h3" v-if="practiceRoutineData">
    {{ practiceRoutineData.title }}
  </h3>

  <q-table
    :columns="completionsTableColumns"
    :rows="completionsList"
  ></q-table>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

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
      practiceRoutineData.value = practiceStore.getPracticeRoutineById(
        Number(props.id)
      )
      // If is false is not in the store so tries to retrieve
      if (!practiceRoutineData.value) {
        let result = await practiceStore.retrievePracticeRoutine(Number(props.id))
        if (result) {
          practiceRoutineData.value = practiceStore.getPracticeRoutineById(
            Number(props.id)
          )
          await practiceStore.retrieveUserCompletedPracticeRoutines()
          completionsList.value = practiceStore.
            getUserPracticeRoutineCompletionsByRoutineId(
              Number(props.id)
            )
        } else {
          // It does not exist
          router.push({name: "notFound"})
        }
      }
    })
    return {
      practiceRoutineData,
      completionsList,
      completionsTableColumns,
    }
  }
}
</script>
