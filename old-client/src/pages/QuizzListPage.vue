<template>
  <q-page padding>
    <SearchInput @search="searchQuizzes"/>
    <AddNewBtn :to="{name: 'quizzEditorPage'}" />
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
import SearchInput from "src/components/for-input/SearchInput"
import AddNewBtn from "src/components/for-input/AddNewBtn"


export default {
  name: "QuizzListPage",
  components: {
    SearchInput,
    AddNewBtn,
  },
  setup() {
    const quizzStore = useQuizzStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const searchInput = ref("")
    const displayedQuizzes = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          quizzStore.getQuizzesList,
          searchInput.value,
          ["title"],
        ) 
      } else return quizzStore.getQuizzesList
    })

    function searchQuizzes(searchPattern) {
      searchInput.value = searchPattern
    }

    onBeforeMount(async () => {
      let result = await quizzStore.retrieveQuizzesList()

      if (!result) quasar.notify(errorNotification(t("general.failed")))
    })

    useMeta({
      title: t("quizzesListPage.pageTitle"),
    })
    
    return {
      displayedQuizzes,

      searchQuizzes,
    }
    
  }
}
</script>
