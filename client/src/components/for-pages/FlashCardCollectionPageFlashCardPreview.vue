<template>
  <q-card 
    class="flashcard-preview animated"
    :class="{
      'flipInY': props.isOnResponseSide,
      'backInDown': props.isNew,
    }"
  >
    <q-card-section 
      v-if="!props.isOnResponseSide"
      class="column items-center"
    >
      {{ props.cardData.hint }}
    </q-card-section>
    <q-card-section 
      v-else
      class="column items-center"
    >
      {{ props.cardData.response }}
    </q-card-section>

    <q-card-actions 
      align="right"
      class="absolute-bottom"
    >
      <q-btn
        v-if="!props.isOnResponseSide"
        round
        flat
        icon="chevron_right"
        @click="flipToResponse"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue"

export default {
  name: "FlashCardCollectionPageFlashCardPreview",
  props: {
    cardData: {
      required: true
    },
    isOnResponseSide: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
    }
  },
  emits: ["update:isOnResponseSide"],
  setup(props, ctx) {

    function flipToResponse(){
      ctx.emit("update:isOnResponseSide", true)
    }

    return {
      props,

      flipToResponse,
    }
  }
}
</script>

<style>
.flashcard-preview {
  max-height: 20rem;
  max-width: 35rem;
  min-height: 20rem;
  min-width: 35rem;
}
</style>
