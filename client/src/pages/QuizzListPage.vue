<template>
  <q-page padding>
    <div class="col-12 row justify-center">
      <q-input 
        rounded
        outlined
        v-model="searchInput"
        class="col-4"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <ul>
      <li
        v-for="quizz in displayedQuizzes"
        :key="quizz.id"
      >
        <router-link :to="{name: 'quizzPage', params:{id: quizz.id}}">
          {{ quizz.title }}
        </router-link>
      </li> 
    </ul>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useQuizzStore } from "src/stores/quizz-store"
import { errorNotification } from "src/utils/notifications"
import { fuzzySearchByObjectByKeys } from "src/utils/search"


export default {
  name: "QuizzListPage",
  setup() {
    const quizzStore = useQuizzStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const searchInput = ref("")
    const displayedQuizzes = computed(() => {
      if (searchInput.value) return fuzzySearchByObjectByKeys(
        quizzStore.getQuizzesList,
        searchInput.value,
        ["title"],
      )
      else return quizzStore.getQuizzesList
    })

    onBeforeMount(async () => {
      let result = await quizzStore.retrieveQuizzesList()

      if (!result) quasar.notify(errorNotification(t("general.failed")))
    })

    useMeta({
      title: t("quizzesListPage.pageTitle"),
    })
    
    return {
      displayedQuizzes,
      searchInput,
    }
    
  }
}
</script>
