<template>
  <q-page>
    <div v-if="cheatsheetStore.getSheets.length > 0" class="row justify-center q-gutter-md">
      <q-itersection
        v-for="sheet in cheatsheetStore.getSheets" 
        :key="sheet.id" 
      >
        <q-card class="q-pa-md sheet-card">
          <router-link :to="{name: 'cheatsheet', params: {title: sheet.url}}">
            <q-card-section class="column items-center text-h4">
              {{ sheet.title }}
            </q-card-section>
        
            <q-card-section>
              {{ sheet.description }}
            </q-card-section>
        
          </router-link>
        </q-card>
      </q-itersection>
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
        :to="{name: 'newCheatsheet' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"

export default {
  name: "CheatsheetListPage",
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()

    const cheatsheetStore = useCheatsheetStore()
    
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
    }
  }
}
</script>

<style scoped>
.sheet-card {
  min-width: 20rem;
  min-height: 20rem;
}
</style>
