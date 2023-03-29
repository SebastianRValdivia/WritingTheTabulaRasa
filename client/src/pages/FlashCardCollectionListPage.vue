<template>
  <q-page padding class="row justify-center">
    <q-list class="col col-12 row">
      <q-item 
        class="col col-9 row"
        v-for="collection in quizzStore.getFlashCardCollectionList" 
        :key="collection.id"
      >
        <div>
          <h4>
            {{ collection.title }}
          </h4>
          <p>
            {{ collection.description }}
          </p>
        </div>
        <CardDeck 
          class="q-pt-xl absolute-right"
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
