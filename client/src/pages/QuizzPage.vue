<template>
  <q-page padding class="column items-center">
    <div class="col-12">
      <h4 class="text-h4">
        {{ quizzData.title }}
      </h4>
  </div>

    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      v-if="questionsList.length > 1"
      style="min-width: 90%"
    >
      <q-step
        v-for="(question, index) in questionsList"
        :key="index"
        :name="index"
        :title="question.question"
        :done="quizzResult[index] === true"
      >
        <QuizzPageFormulationQuestion 
          v-if="question.type === 0"
          :questionId="question.id"
          @ready="checkAnswer"
        />
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation align="center">
          <q-btn-group flat>
            <q-btn
              @click="nextStep()" 
              icon="arrow_downward"
            />
            <q-btn 
              @click="previousStep()" 
              icon="arrow_upward"
              class="q-ml-sm" 
            />
          </q-btn-group>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"

import { useQuizzStore } from "src/stores/quizz-store"
import QuizzPageFormulationQuestion from 
  "src/components/for-pages/QuizzPageFormulationQuestion"

export default {
  name: "QuizzPage",
  props: {
    id: String
  },
  components: {
    QuizzPageFormulationQuestion,
  },
  setup(props) {
    const quizzStore = useQuizzStore()

    const quizzData = ref({})
    const questionsList = ref([])
    const step = ref(0)
    const quizzResult = ref([])

    function checkAnswer(result, index) {
      quizzResult.value.push(result)
    }
    function nextStep() {
      step.value += 1
    }
    function previousStep() {
      step.value -= 1
    }
    async function loadPage(quizzId) {
      // Get quizz data
      quizzData.value = quizzStore.getQuizzDataById(quizzId)
      if (!quizzData.value) {
        await quizzStore.retrieveQuizzById(quizzId)
        quizzData.value = quizzStore.getQuizzDataById(quizzId)
      }
      // Get quizz questions
      questionsList.value = quizzStore.getQuestionsByQuizzId(quizzId)
      if (questionsList.value.length === 0) {
        await quizzStore.retrieveQuizzesQuestionsList()
        questionsList.value = quizzStore.getQuestionsByQuizzId(quizzId)
      }
    }

    onBeforeMount(async () => {
      let pageLoaded = await loadPage(Number(props.id))
    })
    return {
      props,
      quizzStore,

      quizzData,
      questionsList,
      step,
      quizzResult,

      checkAnswer,
      previousStep,
      nextStep,

    }
  }
}
</script>
