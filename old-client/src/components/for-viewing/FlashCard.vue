<template>
  <q-card 
    class="scoped-flashcard-preview animated"
    :class="{ flipInY: isOnResponseSide, flipInX: !isOnResponseSide }"
  >
    <q-card-section 
      v-if="!isOnResponseSide"
      class="row fit text-h5 text-bold"
    >
      <span class="q-pb-xl absolute-center">
        {{ props.cardData.hint }}
      </span>
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
        flat
        icon="chevron_right"
        @click="flipToResponse"
      />
      <q-btn
        v-else
        flat
        icon="chevron_left"
        @click="flipToHint"
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
    isNew: {
      type: Boolean,
    }
  },
  setup(props) {
    const isOnResponseSide = ref(false)

    function flipToResponse() {
      isOnResponseSide.value = true
    }
    function flipToHint() {
      isOnResponseSide.value = false
    }

    return {
      props,
      isOnResponseSide,

      flipToResponse,
      flipToHint,
    }
  }
}
</script>

<style scoped>
.scoped-flashcard-preview {
  max-height: 20rem;
  max-width: 35rem;
  min-height: 20rem;
  min-width: 35rem;
}
</style>
