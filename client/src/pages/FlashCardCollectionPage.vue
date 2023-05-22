<template>
  <q-page padding class="row">
    <div v-if="!hasTestEnded" class="col column items-center">
      <p>
        {{ $t("flashCardCollectionPage.score")}}: {{ userScore }}
      </p>
      <FlashCard 
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
import { ref, onBeforeMount, computed } from "vue"
import { useQuasar } from "quasar"
import api from "src/api"
import { useI18n } from "vue-i18n"

import { useQuizzStore } from "src/stores/quizz-store"
import { useUserStore } from "src/stores/user-store"
import FlashCard from
  "src/components/for-viewing/FlashCard"
import { errorNotification } from "src/utils/notifications"

export default {
  name: "FlashCardCollectionPage",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    FlashCard
  },
  setup(props) {
    const quizzStore = useQuizzStore()
    const userStore = useUserStore()
    const quasar = useQuasar()
    const { t } = useI18n()
    
    const flashCardList = ref()
    const displayedFlashCard = ref(null)
    const toSolveFlashCards = ref([]) // TODO: Add list in name
    const solvedFlashCards = ref([])
    const isFlipped = ref(false) // If card is fliped to response
    const isCardInitializing = ref(false) // If a new card was just picked
    const userTries = ref(0)
    const hasTestEnded = ref(false)

    const userScore = computed(() => {
      if (userTries.value <= 0) {
        return 0
      }
      let score = (
          flashCardList.value.length / userTries.value
      ) * 100
      // Since api require positive integers
      return score.toFixed() // Round number
      
    })

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
    async function finishTest() {
      let result = await quizzStore.createFlashCardResult({
        score: userScore,
        collection: Number(props.id),
        owner: userStore.getUserId
      })

      if (result) {
        hasTestEnded.value = true
      } else {
        quasar.notify(errorNotification(t("general.failed")))
      }
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
