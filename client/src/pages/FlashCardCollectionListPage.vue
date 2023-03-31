<template>
  <q-page padding class="row justify-center">
    <q-list class="col col-12">
      <q-item 
        class="scoped-collection-item row q-ma-md"
        v-for="collection in quizzStore.getFlashCardCollectionList" 
        :key="collection.id"
      >
        <div class="col col-9 overflow-auto">
          <h4>
            {{ collection.title }}
          </h4>
          <p>
            {{ collection.description }}
          </p>
        </div>
        <CardDeck 
          v-if="
            quizzStore.getFlashCardsByCollectionId(collection.id).length > 0
          "
          class="q-pt-xl col col-3"
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

<style scoped>
.scoped-collection-item {
  max-height: 15rem;
  min-height: 15rem;
}

</style>
