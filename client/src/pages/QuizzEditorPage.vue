<template>
  <q-page padding class="row">
    <SubmitBtn @click="submit" />
    <div class="col col-11">
      <q-input 
        input-class="text-h4"
        v-model="titleInput"
        :rules="[val => !!val || $t('general.required')]"
      />
    </div>
    <div class="col col-10 row scoped-question-input">
      <q-input 
        class="col col-5"
        :label="$t('quizzEditorPage.question')"
        v-model="questionInput"
        :rules="[val => !!val || $t('general.required')]"
      >
        <template v-slot:append>
          <q-icon name="question_mark"/>
        </template>
      </q-input>
      <q-space />
      <q-select 
        class="col col-3"
        :label="$t('quizzEditorPage.type')"
        v-model="typeSelection"
        :options="typeOptions"
        emit-value
        map-options
      />
      <q-space />
      <q-btn 
        class="col col-1"
        icon="add"
        flat
        @click="addQuestion"
      />
    </div>
    {{ questionList }}
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useI18n } from "vue-i18n"

import { useQuizzStore } from "src/stores/quizz-store"
import SubmitBtn from "src/components/for-input/SubmitBtn"

export default {
  name: "QuizzEditorPage",
  components: {
    SubmitBtn
  },
  setup() {
    const quizzStore = useQuizzStore()
    const { t } = useI18n()

    const titleInput = ref("")
    const questionList = ref([])
    const questionInput = ref("")
    const typeSelection = ref(null)
    const typeOptions = [ // From quizz question choices
      {
        label: t("quizzEditorPage.formulation"),
        value: "1",
      },
      {
        label: t("quizzEditorPage.choice"),
        value: "2",
      },
      {
        label: t("quizzEditorPage.join"),
        value: "3",
      },
      {
        label: t("quizzEditorPage.list"),
        value: "4",
      },
    ]

    function clearQuestionInputs() {
      questionInput.value = ""
      typeSelection.value = null
    }
    function addQuestion() {
      let questionData = {
        type: typeSelection.value,
        question: questionInput.value,
      }
      if (questionData.type && questionData.question) {
        questionList.value.push(questionData)
        clearQuestionInputs()
      }
    }
    async function submit() {
      if (titleInput.value) {
        let quizzData = {
          title: titleInput.value
        }
        let resultQuizzCreation = await quizzStore.createQuizzObject(quizzData)

        for (let questionData of questionList.value) {
          // Add the quizz id to the obj
          questionData = {...questionData, quizz: resultQuizzCreation.id}
          let resultQuestionCreation = await quizzStore.createQuizzQuestion(
            questionData
          )
        }
      }
    }

    return { 
      titleInput,
      questionList,
      questionInput,
      typeSelection,
      typeOptions,

      addQuestion,
      submit,
    }
  }
}
</script>

<style scoped>
.scoped-question-input {
  max-height: 1rem;
}
</style>
