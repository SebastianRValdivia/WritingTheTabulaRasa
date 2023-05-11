<template>
  <q-page padding class="row">
    <q-input 
      :label="$t('flashCardCollectionEditorPage.collectionTitle')"
      class="col col-10"
      v-model="titleInput"
    />
    <SubmitBtn 
      @click="submitDeck"
    />

    <div class="col col-12 column items-center q-pa-xl">
      <FlashCardInput @onDone="saveFlashCard"/>
    </div>

    <div class="row justify-center q-gutter-md">
      <q-card
        v-for="(flashCard, index) in flashCardsList"
        :key="index"
        class="scoped-flashcard col"
      >
        <q-card-section>
          {{ flashCard.hint }}
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { ref } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

import { useQuizzStore } from "src/stores/quizz-store"
import { errorNotification } from "src/utils/notifications"
import SubmitBtn from "src/components/for-input/SubmitBtn"
import FlashCardInput from 
  "src/components/for-pages/FlashCardCollectionEditorPage/FlashCardInput"

export default {
  name: "flashCardCollectionEditorPage",
  props: {
    id: {
      type: String
    }
  },
  components: {
    SubmitBtn,
    FlashCardInput,
  },
  setup(props) {
    const { t } = useI18n()
    const quizzStore = useQuizzStore()
    const router = useRouter()
    const quasar = useQuasar()

    const titleInput = ref("")
    const flashCardsList = ref([])
    // Change when something has been modified
    const noModifications = ref(true) 

    function saveFlashCard(cardData) {
      flashCardsList.value.push(cardData)
    }
    async function submitDeck() {
      let idAssignedToDeck = await quizzStore.saveFlashCardCollection({
        title: titleInput.value
      })

      if (idAssignedToDeck) {
        const cardsListWithCollectionId = flashCardsList.value.map(
          (cardData) => ({...cardData, collection: idAssignedToDeck})
        )
        for (let flashCardData of cardsListWithCollectionId) {
          await quizzStore.saveFlashCard(flashCardData)
        }
      }
    }
    async function deleteCollection() {
      let result = await quizzStore.removeFlashCardCollection(
        Number(props.id)
      )
      if (result) return router.push({name: "flashCardCollectionListPage"})
      else return quasar.notify(errorNotification(t("general.failed")))
    }

    useMeta({
      title: t("flashCardCollectionEditorPage.pageTitle")
    })
    return {
      props,
      titleInput,
      flashCardsList,
      noModifications,

      saveFlashCard,
      submitDeck,
      deleteCollection,
    }
  }

}
</script>

<style scoped>
.scoped-flashcard {
  min-height: 20rem;
  min-width: 30rem;
  max-height: 20rem;
  max-width: 30rem;
}
</style>
