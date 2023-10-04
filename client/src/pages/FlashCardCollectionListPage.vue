<template>
  <q-page padding class="row justify-center">
    <div class="col-12 row">
      <SearchInput />
      <q-page-sticky
        position="top-right"
        :offset="[20, 20]"
        class="scoped-add-btn"
      >
        <q-btn
          v-if="userStore.isUserLogged"
          round
          color="primary"
          icon="add"
          size="md"
          :to="{name: 'flashCardCollectionEditorPage' }"
        />
      </q-page-sticky>
    </div>
    <q-list class="col col-12">
      <q-item
        class="scoped-collection-item row q-ma-md"
        v-for="collection in quizzStore.getFlashCardCollectionList"
        :key="collection.id"
      >
        <div class="col col-9 overflow-auto">
          <h4>
            {{ collection.title }}
            <q-btn
              flat
              round
              icon="edit"
              @click="pushToEditPage(collection.id)"
            />
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
  </q-page>

</template>

<script>

import { ref, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"
import { useRouter } from "vue-router"

import { useQuizzStore } from "src/stores/quizz-store"
import { useUserStore } from "src/stores/user-store"
import CardDeck from "src/components/for-viewing/CardDeck.vue"
import SearchInput from "src/components/for-input/SearchInput.vue"

export default {
  name: "FlashCardListPage",
  components: {
    CardDeck,
    SearchInput,
  },
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const quizzStore = useQuizzStore()
    const userStore = useUserStore()
    const router = useRouter()


    function pushToEditPage(id) {
      router.push({
        name: "flashCardCollectionEditorPage",
        params: {id: id}
      })
    }

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

      pushToEditPage,
    }
  }
}
</script>

<style scoped>
.scoped-collection-item {
  max-height: 15rem;
  min-height: 15rem;
}
.scoped-add-btn {
  z-index: 999;
}

</style>
