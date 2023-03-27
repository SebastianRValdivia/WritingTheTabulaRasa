<template>
  <q-page padding class="column items-center">
    <FlashCardCollectionPageFlashCardPreview 
      :cardData="displayedFlashCard"
      class="q-mt-xl"
    />
    <div class="row q-gutter-md q-ma-lg">
      <q-btn 
        round
        icon="done"
        color="positive"
        @click="removeCardFromDeck"
      />
      <q-btn 
        round
        icon="close"
        color="negative"
        @click="pickFlashCard"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useQuizzStore } from "src/stores/quizz-store"
import FlashCardCollectionPageFlashCardPreview from 
  "src/components/for-pages/FlashCardCollectionPageFlashCardPreview"

export default {
  name: "FlashCardCollectionPage",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    FlashCardCollectionPageFlashCardPreview
  },
  setup(props) {
    const quizzStore = useQuizzStore()
    const quasar = useQuasar()
    
    const flashCardList = ref()
    const displayedFlashCard = ref()
    const toSolveFlashCards = ref([])
    const solvedFlashCards = ref([])

    function pickFlashCard() {
      displayedFlashCard.value = toSolveFlashCards.value[
        Math.floor( Math.random() * toSolveFlashCards.value.length )
      ]
    }

    function removeCardFromDeck() {
      toSolveFlashCards.value = toSolveFlashCards.value.filter(
        (card) => card.id !== displayedFlashCard.value.id
      )
      pickFlashCard()
    }

    onBeforeMount( async () => {
      quasar.loading.show()

      flashCardList.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      if (flashCardList.value.length === 0) {
        await quizzStore.retrieveFlashCardsByCollectionId(Number(props.id))
        flashCardList.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      }

      toSolveFlashCards.value = flashCardList.value
      pickFlashCard()
      quasar.loading.hide()
    })
    return {
      toSolveFlashCards,
      displayedFlashCard,

      pickFlashCard,
      removeCardFromDeck,
    }
  }
}
</script>
