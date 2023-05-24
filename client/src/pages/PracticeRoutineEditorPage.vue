<template>
  <q-page padding class="row">
    <SubmitBtn
      @click="submit"
      :status="isTitleEntered"
    />
    <div class="col col-12 column items-center">
      <q-input
        v-model="titleInput"
        :label="$t('practiceRoutineEditorPage.routineTitle')"
        input-class="text-h5"
      />
    </div>
    <div class="col col-12 column items-center">
      <q-card class="col col-12">
        <q-card-section class="row q-gutter-md">
          <q-input
            v-model="exerciseTitleInput"
            class="col col-9"
            :label="$t('practiceRoutineEditorPage.exerciseTitle')"
            input-class="text-h5"
            :rules="[val => !!val || $t('general.required')]"
          />
          <q-input
            v-model.number="exerciseDificultyInput"
            type="number"
            :label="$t('practiceRoutineEditorPage.difficulty')"
            class="col col-2"
            :rules="[
              val => (val <= 5) || $t('practiceRoutineEditorPage.overMax')
            ]"
          />
          <q-input
            v-model="exerciseContentInput"
            class="col col-12"
            :label="$t('practiceRoutineEditorPage.description')"
            input-class="text-h5"
            autogrow
            borderless
            :rules="[val => !!val || $t('general.required')]"
          />
        </q-card-section>
        <q-card-actions class="absolute-bottom" align="center">
          <q-btn
            flat
            icon="add"
            @click="addExercise"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-list class="col col-12 q-pl-xl q-pt-xl">
      <ExercisePreview
          v-for="(exercise, index) in exerciseList"
          :key="index"
          :exerciseData="exercise"
      />
    </q-list>

  </q-page>
</template>

<script>
import { ref, computed } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

import { usePracticeStore } from "src/stores/practice-store"
import SubmitBtn from "src/components/for-input/SubmitBtn"
import ExercisePreview from "src/components/for-viewing/ExercisePreview"


export default {
  name: "PracticeRoutineEditorPage",
  components: {
    SubmitBtn,
    ExercisePreview,
  },
  setup() {
    const { t } = useI18n()
    const practiceStore = usePracticeStore()
    const router = useRouter()

    const titleInput = ref("")
    const exerciseTitleInput = ref("")
    const exerciseContentInput = ref("")
    const exerciseDificultyInput = ref("")
    const exerciseList = ref([])

    const isTitleEntered = computed(() => {
      return titleInput.value.length > 0
    })

    function clearExerciseInputs() {
      exerciseTitleInput.value = ""
      exerciseContentInput.value = ""
      exerciseDificultyInput.value = ""
    }
    function addExercise() {
      let newExerciseData = {
        title: exerciseTitleInput.value,
        content: exerciseContentInput.value,
        difficulty: exerciseDificultyInput.value,
      }
      exerciseList.value.push(newExerciseData)
      clearExerciseInputs()
    }
    async function submit() {
      if (titleInput.value) {
        let resultRoutineCreation = await practiceStore.createPracticeRoutine({
          title: titleInput.value,
        })
        if (resultRoutineCreation) {
          for (let exerciseData of exerciseList.value) {
            let newExerciseData = {
              routine: resultRoutineCreation.id,
              ...exerciseData,
            }
            let resultExerciseCreation = await practiceStore
              .createPracticeExercise(newExerciseData)
          }
          router.push({
            name: "practiceRoutinePreviewPage",
            params: {
              id: resultRoutineCreation.id
            }
          })

        }
      }
    }

    useMeta({
      title: t("practiceRoutineEditorPage.pageTitle"),
    })
    return {
      titleInput,
      exerciseTitleInput,
      exerciseContentInput,
      exerciseDificultyInput,
      exerciseList,

      isTitleEntered,

      addExercise,
      submit,
    }
  }
}

</script>
