<template>
  <q-page padding>
    {{displayedFlashCards}}
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useQuizzStore } from "src/stores/quizz-store"

export default {
  name: "FlashCardCollectionPage",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const quizzStore = useQuizzStore()
    const quasar = useQuasar()
    
    const displayedFlashCards = ref()

    onBeforeMount( async () => {
      quasar.loading.show()

      displayedFlashCards.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      if (displayedFlashCards.value.length === 0) {
        await quizzStore.retrieveFlashCardsByCollectionId(Number(props.id))
        displayedFlashCards.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      }
      quasar.loading.hide()
    })
    return {
      props,
      displayedFlashCards,
    }
  }
}
</script>
