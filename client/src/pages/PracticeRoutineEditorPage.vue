<template>
  <q-page padding class="row">
    <SubmitBtn 
      @click="submit"
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
            :label="$t('practiceRoutineEditorPage.dificulty')"
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

    {{ exerciseList }}
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { usePracticeStore } from "src/stores/practice-store"
import SubmitBtn from "src/components/for-input/SubmitBtn"


export default {
  name: "PracticeRoutineEditorPage",
  components: {
    SubmitBtn,
  },
  setup() {
    const { t } = useI18n()
    const practiceStore = usePracticeStore()

    const titleInput = ref("")
    const exerciseTitleInput = ref("")
    const exerciseContentInput = ref("")
    const exerciseDificultyInput = ref("")
    const exerciseList = ref([])

    function clearExerciseInputs() {
      exerciseTitleInput.value = ""
      exerciseContentInput.value = ""
      exerciseDificultyInput.value = ""
    }
    function addExercise() {
      let newExerciseData = {
        title: exerciseTitleInput.value,
        content: exerciseContentInput.value,
        dificulty: exerciseDificultyInput.value,
      }
      exerciseList.value.push(newExerciseData)
      clearExerciseInputs()
    }
    async function submit() {
      if (titleInput.value) {
        await practiceStore.createPracticeRoutine({
          title: titleInput.value,
        })
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

      addExercise,
      submit,
    }
  }
}

</script>
