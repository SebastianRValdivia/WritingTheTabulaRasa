<template>
  <div class="col-12 row justify-center q-pa-sm">
    <q-input 
      rounded
      outlined
      v-model="patternInput"
      class="col-4"
      @keydown.enter="done"
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
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  name: "SearchInput",
  emits: ["search"],
  setup(props, ctx) {
    const patternInput = ref("")

    function done() {
      ctx.emit("search", patternInput.value)
    }

    return {
      patternInput,

      done,
    }


  }
}
</script>
