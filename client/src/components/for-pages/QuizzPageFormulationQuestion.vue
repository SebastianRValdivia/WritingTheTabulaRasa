<template>
<q-card>
  <q-card-section>
    <q-input 
      v-if="!previewAnswer"
      v-model="responseInput"
      type="textarea"
    />
    <q-splitter
      v-else
      v-model="splitterSize"
      style="height: 400px"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <span class="text-h4">
            {{ $t("quizzPageFormulationQuestion.correctAnswer")}}
          </span>
          <div>
            {{ formulationResponse.response }}
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <span class="text-h4">
            {{ $t("quizzPageFormulationQuestion.yourAnswer")}}
          </span>
          <div>
            {{ responseInput }}
          </div>
        </div>
      </template>
    </q-splitter>
  </q-card-section>
  <q-card-actions align="right">
    <q-btn-group v-if="previewAnswer">
      <q-btn icon="close" @click="markNegative"/>
      <q-btn icon="done" @click="markPositive"/>
    </q-btn-group>
    <q-btn v-else icon="done" @click="readyForReview"/>
  </q-card-actions>

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
  emits: ["ready"],
  setup(props, { emit }) {
    const quizzStore = useQuizzStore()

    const formulationResponse = ref()
    const previewAnswer = ref(false)
    const responseInput = ref()
    const splitterSize = ref(50)

    function readyForReview() {
      previewAnswer.value = true
    }
    function markPositive() {
      emit("ready", true)
    }
    function markNegative() {
      emit("ready", false)
    }

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
      previewAnswer,
      splitterSize,

      readyForReview,
      markPositive,
      markNegative,

    }
    
  }
}

</script>
