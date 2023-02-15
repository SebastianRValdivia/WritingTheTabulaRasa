<template>
  <div 
    class="col-12 row justify-center q-pa-sm"
    @keydown.enter="done"
  >
    <q-input 
      rounded
      outlined
      v-model="patternInput"
      class="col-4 q-mr-md self-center"
    >
      <template v-slot:append>
        <q-icon 
          v-if="patternInput"
          name="send"
          @click="done"
        />
        <q-icon 
          v-else
          name="search"
        />
      </template>
    </q-input>
    <LearningResourceChooser 
      class="col-2"
      v-if="props.learningResourceChooser"
      v-model="learningResourceInput"
      @selected="done"
    />
  </div>
</template>

<script>
import { ref } from "vue"

import LearningResourceChooser from "src/components/for-input/LearningResourceChooser"

export default {
  name: "SearchInput",
  components: {
    LearningResourceChooser
  },
  props: {
    learningResourceChooser: {
      type: Boolean,
      default: false
    }
  },
  emits: ["search", "learningResource"],
  setup(props, ctx) {
    const patternInput = ref("")
    const learningResourceInput = ref()

    function done() {
      ctx.emit("search", patternInput.value)

      if (learningResourceInput.value) {
        ctx.emit("learningResource", learningResourceInput.value)
      }
    }

    return {
      props,

      patternInput,
      learningResourceInput,

      done,
    }


  }
}
</script>
