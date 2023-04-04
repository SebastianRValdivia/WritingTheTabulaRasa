<template>
  <q-page padding class="row">
    <div v-if="!hasTestEnded" class="col column items-center">
      <FlashCardCollectionPageFlashCardPreview 
        :cardData="displayedFlashCard"
        :isNew="isCardInitializing"
        v-model:isOnResponseSide="isFlipped"
        class="q-mt-xl"
      />
      <div class="row q-gutter-md q-ma-lg">
        <q-btn 
          round
          icon="close"
          color="negative"
          @click="negativeAttempt()"
        />
        <q-btn 
          round
          icon="done"
          color="positive"
          @click="positiveAttempt()"
        />
      </div>
    </div>
    <div 
      v-else 
      class="col column items-center text-h1"
      :class="{
        'text-positive': userScore >= 50,
        'text-negative': userScore < 50
      }"
    >
      {{ userScore }}
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
    const displayedFlashCard = ref(null)
    const toSolveFlashCards = ref([]) // TODO: Add list in name
    const solvedFlashCards = ref([])
    const isFlipped = ref(false) // If card is fliped to response
    const isCardInitializing = ref(false) // If a new card was just picked
    const userTries = ref(0)
    const userScore = ref(0)
    const hasTestEnded = ref(false)

    function pickNewFlashCard() {
      isCardInitializing.value = true
      // There is one displayed
      if (displayedFlashCard.value !== null) {
        let cardsMinusDiplayed = toSolveFlashCards.value.filter(
          (card) => card.id !== displayedFlashCard.value.id
        )
        displayedFlashCard.value = cardsMinusDiplayed[
          Math.floor( Math.random() * cardsMinusDiplayed.length )
        ]
      // There is nothing displayed yet
      } else {
        displayedFlashCard.value = toSolveFlashCards.value[
          Math.floor( Math.random() * toSolveFlashCards.value.length )
        ]
      }
      isFlipped.value = false
    }

    function removeCardFromDeck() {
      toSolveFlashCards.value = toSolveFlashCards.value.filter(
        (card) => card.id !== displayedFlashCard.value.id
      )
      if (toSolveFlashCards.value.length === 0) {
        finishTest()
      } else {
        pickNewFlashCard()
      }
    }

    // User could not solve the flash card
    function negativeAttempt() {
      userTries.value += 1
      pickNewFlashCard()
    }

    // User solve the flash card
    function positiveAttempt() {
      userTries.value += 1
      removeCardFromDeck()
    }

    function finishTest() {
      userScore.value = (
          flashCardList.value.length / userTries.value
      ) * 100
      hasTestEnded.value = true
    }

    onBeforeMount( async () => {
      quasar.loading.show()

      flashCardList.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      if (flashCardList.value.length === 0) {
        await quizzStore.retrieveFlashCardsByCollectionId(Number(props.id))
        flashCardList.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
      }

      toSolveFlashCards.value = flashCardList.value
      pickNewFlashCard()
      quasar.loading.hide()
    })
    return {
      toSolveFlashCards,
      displayedFlashCard,
      isCardInitializing,
      isFlipped,
      userScore,
      hasTestEnded,

      negativeAttempt,
      positiveAttempt,
    }
  }
}
</script>
