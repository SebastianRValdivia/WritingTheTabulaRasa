<template>
  <q-card 
    class="flashcard-preview"
  >
    <q-card-section class="column items-center">
      {{ props.cardData.hint }}
    </q-card-section>
    <q-card-actions 
      align="center"
      class="absolute-bottom"
    >
      <q-btn 
        round
        icon="done"
        color="positive"
        @click="$emit('correct')"
      />
      <q-btn 
        round
        icon="close"
        color="negative"
        @click="$emit('incorrect')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>

export default {
  name: "FlashCardCollectionPageFlashCardPreview",
  props: {
    cardData: {
      required: true
    }
  },
  emits: ["correct", "incorrect"],
  setup(props) {
    return {
      props
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
