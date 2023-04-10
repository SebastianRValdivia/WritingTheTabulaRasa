<template>
  <q-page padding class="row">
    <h3 class="text-h3 col-12" v-if="practiceRoutineData">
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
