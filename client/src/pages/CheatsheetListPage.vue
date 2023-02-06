<template>
  <q-page padding>
    <div 
      v-if="cheatsheetStore.getSheets.length > 0" 
      class="row justify-center q-gutter-lg"
    >
      <SearchInput @search="searchSheets"/>
      <q-intersection
        v-for="sheet in displayedSheets" 
        :key="sheet.id" 
        once
        transition="scale"
      >
        <router-link 
          :to="{name: 'cheatsheet', params: {url: sheet.url}}"
        >
          <q-card class="q-pa-md sheet-card">
            <span class="row justify-end">
              <q-btn 
                icon="edit" 
                size="sm" 
                round 
                :to="{name: 'cheatsheetEditor', params: {url: sheet.url}}"
                v-if="userStore.isUserLogged"
              /> 
            </span>
            <h4 class="text-h4 column items-center">
              {{ sheet.title }}
            </h4>
            <q-card-section>
              <p>
                {{ sheet.description }}
              </p>
            </q-card-section>
          </q-card>
        </router-link>
      </q-intersection>
    </div>
    
    <div v-else class="row justify-center">
      <h1>{{ $t("sheetPage.noSheets") }}</h1>
    </div>
    
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn 
        round 
        color="secondary" 
        icon="add" 
        size="md" 
        :to="{name: 'cheatsheetEditor' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import { useUserStore } from "src/stores/user-store"
import SearchInput from "src/components/for-input/SearchInput"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  name: "CheatsheetListPage",
  components: {
    SearchInput
  },
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()
    const userStore = useUserStore()

    const searchInput = ref("")
    const displayedSheets = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          cheatsheetStore.getSheets,
          searchInput.value,
          ["title"]
        )
      } else return cheatsheetStore.getSheets
    })

    function searchSheets(searchPattern) {
      searchInput.value = searchPattern
    }

    onBeforeMount(async () => {
      $q.loading.show()
      await cheatsheetStore.retrieveSheets()
      $q.loading.hide()
    })
    
    useMeta({
      title: t("cheatSheetListPage.pageTitle"),
    })

    return {
      cheatsheetStore,
      userStore,
      displayedSheets,

      searchSheets,
    }
  }
}
</script>

<style scoped>
.sheet-card {
  min-width: 25rem;
  min-height: 20rem;
  max-width: 25rem;
  max-height: 20rem;
  color: black;
  overflow: hidden;
}
a { text-decoration: none; }
</style>
