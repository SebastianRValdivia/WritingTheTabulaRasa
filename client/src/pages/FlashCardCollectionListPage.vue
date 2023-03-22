<template>
  <q-page padding class="column items-center">
    <q-list>
      <q-item 
        v-for="collection in quizzStore.getFlashCardCollectionList" 
        :key="collection.id">
        <CardDeck 
          :title="collection.title"
          :id="collection.id"
        />
      </q-item>
    </q-list>
    <q-page-sticky 
      v-if="userStore.isUserLogged"
      position="top-right" 
      :offset="[20, 20]"
    >
      <q-btn 
        round 
        color="primary" 
        icon="add" 
        size="md" 
        :to="{name: 'flashCardCollectionEditorPage' }"
      />
    </q-page-sticky>
  </q-page>

</template>

<script>

import { ref, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useQuizzStore } from "src/stores/quizz-store"
import { useUserStore } from "src/stores/user-store"
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
    const userStore = useUserStore()


    onBeforeMount(async () => {
      quasar.loading.show()
      await quizzStore.retrieveFlashCardCollections()
      await quizzStore.retrieveFlashCards()
      quasar.loading.hide()
    })


    useMeta({
      title: t("flashCardListPage.pageTitle")
    })
    return {
      quizzStore,
      userStore,
    }
  }
}
</script>
