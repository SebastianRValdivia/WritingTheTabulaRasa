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
        :done="step > index"
      >
        <QuizzPageFormulationQuestion 
          v-if="question.type === 0"
          :questionId="question.id"
          @ready="checkFormulationAnswer"
        />
        <q-stepper-navigation align="right">
          <q-btn-group>
            <q-btn
              @click="step = index + 1" 
              icon="arrow_downward"
            />
            <q-btn 
              @click="step = index - 1" 
              icon="arrow_upward"
              class="q-ml-sm" 
            />
          </q-btn-group>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"

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
    }
  }
}
</script>
