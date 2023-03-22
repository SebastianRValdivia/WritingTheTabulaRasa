<template>
  <q-page padding class="row">
    <q-input 
      :label="$t('flashCardCollectionEditorPage.collectionTitle')"
      class="col col-12"
    />

    <div class="col col-12 column items-center">
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
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"

export default {
  name: "flashCardCollectionEditorPage",
  setup() {
    const flashCardsList = ref([])
    const hintInput = ref("")
    const responseInput = ref("")
    const cardOnHintSide = ref(true)
    const { t } = useI18n()

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

    useMeta({
      title: t("flashCardCollectionEditorPage.pageTitle")
    })
    return {
      flashCardsList,
      hintInput,
      responseInput,
      cardOnHintSide,

      saveFlashCard,
      toggleToResponseSide,
      toggleToHintSide,
    }
  }

}
</script>

<style scoped>
.scoped-flashcard {
  min-height: 20rem;
  min-width: 30rem;
}
</style>
