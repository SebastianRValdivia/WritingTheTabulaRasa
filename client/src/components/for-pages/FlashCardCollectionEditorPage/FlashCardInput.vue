<template>
  <q-card 
    class="scoped-input-flashcard animated"
    :class="{ flipInY: cardOnHintSide, flipInX: !cardOnHintSide }"
  >
    <q-card-section>
      <q-input
        v-if="cardOnHintSide"
        class="q-mt-xl"
        type="textarea"
        autogrow
        v-model="hintInput"
        :label="$t('flashCardCollectionEditorPage.aHint')"
      />
      <q-input
        v-else
        class="q-mt-xl"
        type="textarea"
        autogrow
        v-model="responseInput"
        :label="$t('flashCardCollectionEditorPage.correctResponse')"
      />
    </q-card-section>
    <q-card-actions 
      align="right" 
      class="absolute-bottom"
    > 
      <q-btn 
        v-if="cardOnHintSide"
        icon="chevron_right"
        flat
        @click="toggleToResponseSide"
      />
      <q-btn 
        v-else
        icon="chevron_left"
        flat
        @click="toggleToHintSide"
      />
    </q-card-actions>
  </q-card>
  <q-btn 
    icon="add"
    @click="emitDone"
    class="q-mt-md q-mb-md"
  />
</template>

<script>
import { ref } from "vue"

export default {
  name: "FlashCardInput",
  emits: ["onDone"],
  setup(props, ctx) {

    const hintInput = ref("")
    const responseInput = ref("")
    const cardOnHintSide = ref(true)

    function toggleToResponseSide() {
      cardOnHintSide.value = false
    }
    function toggleToHintSide() {
      cardOnHintSide.value = true
    }
    function clearInput() {
      hintInput.value = ""
      responseInput.value = ""
      cardOnHintSide.value = false
    }
    function emitDone() {
      let cardData = {
        hint: hintInput.value,
        response: responseInput.value
      }
      ctx.emit("onDone", cardData)
    }


    return {
      hintInput,
      responseInput,
      cardOnHintSide,

      toggleToHintSide,
      toggleToResponseSide,
      emitDone,
    }
  }
}
</script>

<style scoped>
.scoped-input-flashcard {
  min-height: 20rem;
  min-width: 30rem;
  max-height: 20rem;
  max-width: 30rem;
}
</style>
