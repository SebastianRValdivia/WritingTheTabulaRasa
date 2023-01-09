<template>
<q-card>
  <q-input 
    v-model="responseInput"
    type="textarea"
  />
</q-card>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useQuizzStore } from "src/stores/quizz-store"

export default {
  name: "QuizzPageFormulationQuestion",
  props: {
    questionId: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const quizzStore = useQuizzStore()

    const formulationResponse = ref()
    const responseInput = ref()

    onBeforeMount(async () => {
      await quizzStore.retrieveFormulationResponseByQuestionId(
        props.questionId
      )
      formulationResponse.value = quizzStore.getFormulationResponseByQuestionId(
        props.questionId
      )
    })

    return {
      formulationResponse,
      responseInput,

    }
    
  }
}

</script>
