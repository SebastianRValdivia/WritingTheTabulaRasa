<template>
  <q-list>
    <q-item 
      v-for="collection in quizzStore.getFlashCardCollectionList" 
      :key="collection.id">
      <CardDeck :title="collection.title"/>
    </q-item>
  </q-list>

</template>

<script>

import { ref, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useQuizzStore } from "src/stores/quizz-store"
import CardDeck from "src/components/for-viewing/CardDeck"

export default {
  name: "FlashCardListPage",
  components: {
    CardDeck
  },
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const quizzStore = useQuizzStore()


    onBeforeMount(async () => {
      quasar.loading.show()
      await quizzStore.retrieveFlashCardCollections()
      quasar.loading.hide()
    })


    useMeta({
      title: t("flashCardListPage.pageTitle")
    })
    return {
      quizzStore
    }
  }
}
</script>
