<template>
  <q-page 
    padding
  >
    <div 
      class="row"
      v-if="!isRoutineFinished && practiceExercisesList.length > 0"
    >
      <div class="col-1">
        <q-stepper
          v-model="exerciseIndex"
          vertical
          color="primary"
          animated
          flat
        >
          <q-step
            v-for="(exercise, index) in practiceExercisesList"
            :key="exercise.id"
            :name="index"
            :title="exercise.title"
            icon="highlight_off"
            active-icon="chevron_right"
            icon-done="done"
            done-color="positive"
            :done="isExerciseDone(exercise.id)"
            @click="goToExercise(exercise.id, index)"
          >
          </q-step>
        </q-stepper>
      </div>
      <div
        class="col-10 column items-center"
      >
        <h4>
          {{ displayedExerciseData.title }} 
        </h4>
        <div>
          <MarkdownPreview :md="displayedExerciseData.content"/>
        </div>
        <q-btn 
          label="done"
          @click="markCompleted(displayedExerciseData.id)"
        />
      </div>
    </div>
    <div 
      v-else-if="isRoutineFinished && practiceExercisesList.length > 0"
      class="column items-center"
    >
      <h2 class="text-h2 col col-12 text-positive">
        {{ $t("practiceRoutinePage.practiceDone") }}
      </h2>
      <div class="row justify-center">
        <q-icon 
          class="flip-horizontal col"
          name="celebration"
          size="xl"
          color="positive"
        />
        <q-icon 
          class="col"
          name="celebration"
          size="xl"
          color="positive"
        />
      </div>
      <h4
        class="col"
      >
        {{ $t("practiceRoutinePage.savingProgress")}}
      </h4>
    </div>
    <div
      v-else
    >
      <EmptyMsg />
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed, watch } from "vue"
import { useRouter } from "vue-router"

import { usePracticeStore } from "src/stores/practice-store"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"
import EmptyMsg from "src/components/for-viewing/EmptyMsg"

export default {
  name: "PracticeRoutinePage",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    MarkdownPreview,
    EmptyMsg,
  },
  setup(props) {
    const practiceStore = usePracticeStore()
    const router = useRouter()

    const practiceExercisesList = ref([])
    // List of ids to completed exercises
    const completedExercisesIdList = ref([]) 
    const displayedExerciseData = ref({})
    const exerciseIndex = ref(0)

    // Return true when all exercises are completed
    const isRoutineFinished = computed(() => {
      return practiceExercisesList.value.length === 
        completedExercisesIdList.value.length
    })
    
    watch(isRoutineFinished, async (newValue) => {
      if (newValue) {
        let result = await practiceStore.
          createPracticeRoutineCompletion(Number(props.id))
        if (result) {
          router.push({name: "practiceRoutineUserPage", params: {id: props.id}})
        }
      }
    })


    function markCompleted(exerciseId) {
      completedExercisesIdList.value.push(exerciseId)
    }
    function isExerciseDone(idExerciseToCheck) {
      let foundExercise = completedExercisesIdList.value.find( 
        (completedExerciseId) => completedExerciseId === idExerciseToCheck
      )
      return foundExercise ? true : false
    }
    function goToExercise(exerciseId, index) {
      exerciseIndex.value = index
      displayedExerciseData.value = practiceExercisesList.value.find(
        (exercise) => exercise.id === exerciseId
      )
    }

    onBeforeMount(async () => {
      const routineId = Number(props.id)

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
          // TODO: use notify
          console.log("error")
        }
      }
      displayedExerciseData.value = practiceExercisesList.value[0]
    })

    return { 
      practiceExercisesList,
      displayedExerciseData,
      exerciseIndex,

      isRoutineFinished,

      isExerciseDone,
      goToExercise,
      markCompleted,
    }
  }
}
</script>
