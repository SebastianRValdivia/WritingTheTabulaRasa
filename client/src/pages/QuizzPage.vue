<template>
  <q-page padding>
    {{props}}
    {{ questionsList }}
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
      questionsList,
    }
  }
}
</script>
