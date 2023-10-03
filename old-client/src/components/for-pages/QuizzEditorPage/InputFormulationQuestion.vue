<template>
  <div class="column items-left">
    <q-input 
      type="textarea"
      v-model="responseToFormulationQuestionInput"
    />
  </div>
  <div class="col col-12 column items-center">
    <q-btn icon="add" flat @click="emitReady"/>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  name: "InputFormulationQuestion",
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  emits: ["ready"],
  setup(props, ctx) {
    const responseToFormulationQuestionInput = ref("")

    function emitReady() {
      let responseData = {
        response: responseToFormulationQuestionInput.value,
      }
      ctx.emit("ready", responseData, props.index)
    }

    return {
      responseToFormulationQuestionInput,

      emitReady,
    }
  }
}
</script>
