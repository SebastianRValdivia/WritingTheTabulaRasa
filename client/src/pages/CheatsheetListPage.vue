<template>
  <q-page>
    <div 
      v-if="cheatsheetStore.getSheets.length > 0" 
      class="row justify-center q-gutter-lg"
    >
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
import Fuse from "fuse.js"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import { useUserStore } from "src/stores/user-store"

export default {
  name: "CheatsheetListPage",
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()
    const userStore = useUserStore()

    const searchInput = ref("")
    const displayedSheets = computed(() => {
      if (searchInput.value) {
        return searchSheet(searchInput.value)
      } else return cheatsheetStore.getSheets
    })

    function searchSheet(searchPattern) {
      let fuzzySearch = new Fuse(
        cheatsheetStore.getSheets,
        {
          keys: [
            "title",
            "description",
          ]
        }
      )
      return fuzzySearch
        .search(searchPattern)
        .map((item) => item.item)
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
      searchInput,
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
