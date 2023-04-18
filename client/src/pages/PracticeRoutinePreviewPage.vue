<template>
  <q-page padding class="row">
    <div 
      class="col col-12 self-center"
      v-if="!practiceExercisesList"
    >
      <EmptyMsg :msg="$t('practiceRoutinePreviewPage.noExercises')"/>
    </div>
    <div class="col col-12 column items-center" v-else>
    <h3 class="text-h3">{{ routineData.title }}</h3>
      <ul>
        <li
          v-for="exercise in practiceExercisesList"
          :key="exercise.id"
        >
          {{ exercise}}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import { usePracticeStore } from "src/stores/practice-store"
import EmptyMsg from "src/components/for-viewing/EmptyMsg"

export default {
  name: "PracticeRoutinePreviewPage",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    EmptyMsg,
  },
  setup(props) {
    const practiceStore = usePracticeStore()
    const router = useRouter()

    const routineData = ref({})
    const practiceExercisesList = ref([])

    onBeforeMount(async () => {
      const routineId = Number(props.id)

      if (practiceStore.getPracticeRoutineById(routineId)){
        routineData.value = practiceStore.getPracticeRoutineById(routineId)
      } else {
        let result = await practiceStore.retrievePracticeRoutine(routineId)
        if (result) {
          routineData.value = practiceStore.getPracticeRoutineById(routineId)
        } else {
          router.push({name: "notFound"})
        }
      }

      // Check if exercises are on the store
      if (practiceStore.getPracticeExercisesByRoutine(routineId).length > 0) {
        practiceExercisesList.value = 
          practiceStore.getPracticeExercisesByRoutine(routineId)
      } else { // Tries to retrieve exercises
        let result = await practiceStore.retrievePracticeExercisesByRoutine(
          routineId
        )
        if (result) {
          practiceExercisesList.value = 
            practiceStore.getPracticeExercisesByRoutine(routineId)
        } else {
          practiceExercisesList.value = null
        }
      }
    })
    
    return {
      routineData,
      practiceExercisesList,
    }
  }
}
</script>
