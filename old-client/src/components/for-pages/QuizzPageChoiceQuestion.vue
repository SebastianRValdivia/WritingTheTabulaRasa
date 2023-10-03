<template>
  <ul>
    <li
      v-for="choice in choicesList"
      :key="choice.id"
    >
      <q-checkbox
        v-model="userChoiceSelection" 
        :val="choice.id"
        :label="choice.text" 
      />
    </li>
  </ul>
  <q-btn-group>
    <q-btn icon="done" @click="readyForReview"/>
  </q-btn-group>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useQuizzStore } from "src/stores/quizz-store"

export default {
  name: "QuizzPageChoiceQuestion",
  props: {
    questionId: {
      type: Number,
      required: true
    }
  },
  emits: ["ready"],
  setup(props, { emit }) {
    const quizzStore = useQuizzStore()

    const choicesList = ref()
    const userChoiceSelection = ref([])

    function readyForReview() {
      markPositive()
    }
    function markPositive() {
      emit("ready", true)
    }
    function markNegative() {
      emit("ready", false)
    }

    onBeforeMount(async () => {
      await quizzStore.retrieveChoicesByQuestionId(
        props.questionId
      )
      choicesList.value = quizzStore.getChoicesByQuestionId(
        props.questionId
      )
    })
    return {
      choicesList,
      userChoiceSelection,
      readyForReview,
    }
  }
}
</script>
