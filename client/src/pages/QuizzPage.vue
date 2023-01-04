<template>
  <q-page padding class="column items-center">
    <div class="col-12">
      <h4 class="text-h4">
        {{ quizzData.title }}
      </h4>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useQuizzStore } from "src/stores/quizz-store"

export default {
  name: "QuizzPage",
  props: {
    id: String
  },


  setup(props) {
    const quizzStore = useQuizzStore()

    const quizzData = ref({})
    const questionsList = ref([])


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
      quizzData,
      questionsList,
    }
  }
}
</script>
