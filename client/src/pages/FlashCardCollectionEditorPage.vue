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
      <q-card 
        class="col-6 scoped-flashcard animated"
        :class="{ flipInY: cardOnHintSide, flip: !cardOnHintSide }"
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
        <q-card-actions class="column items-center absolute-bottom"> 
          <q-btn 
            v-if="cardOnHintSide"
            icon="chevron_right"
            @click="toggleToResponseSide"
          />
          <q-btn 
            v-else
            icon="chevron_left"
            @click="toggleToHintSide"
          />
        </q-card-actions>
      </q-card>
      <q-btn 
        icon="done"
        @click="saveFlashCard"
        class="q-mt-md q-mb-md"
      />
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

export default {
  name: "flashCardCollectionEditorPage",
  props: {
    id: {
      type: String
    }
  },
  components: {
    SubmitBtn,
  },
  setup(props) {
    const { t } = useI18n()
    const quizzStore = useQuizzStore()
    const router = useRouter()
    const quasar = useQuasar()

    const titleInput = ref("")
    const flashCardsList = ref([])
    const hintInput = ref("")
    const responseInput = ref("")
    const cardOnHintSide = ref(true)
    // Change when something has been modified
    const noModifications = ref(true) 

    function saveFlashCard() {
      let newFlashCardData = {
        hint: hintInput.value,
        response: responseInput.value,
      }
      flashCardsList.value.push(newFlashCardData)
    }
    function toggleToResponseSide() {
      cardOnHintSide.value = false
    }
    function toggleToHintSide() {
      cardOnHintSide.value = true
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
      hintInput,
      responseInput,
      cardOnHintSide,
      noModifications,

      saveFlashCard,
      toggleToResponseSide,
      toggleToHintSide,
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
