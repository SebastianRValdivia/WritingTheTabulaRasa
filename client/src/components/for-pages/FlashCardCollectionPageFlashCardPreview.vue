<template>
  <q-card 
    class="flashcard-preview animated"
    :class="{
      'flipInY': isOnResponseSide
    }"
  >
    <q-card-section 
      v-if="!isOnResponseSide"
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
        v-if="!isOnResponseSide"
        round
        flat
        icon="chevron_right"
        @click="flip"
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
    }
  },
  setup(props) {
    const isOnResponseSide = ref(false)

    function flip() {
      isOnResponseSide.value = !isOnResponseSide.value
    }

    return {
      isOnResponseSide,
      props,

      flip,
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
