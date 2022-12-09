<template>
  <q-page>
    <div 
      v-if="cheatsheetStore.getSheets.length > 0" 
      class="row justify-center q-gutter-lg"
    >
      <q-intersection
        v-for="sheet in cheatsheetStore.getSheets" 
        :key="sheet.id" 
        once
        transition="scale"
      >
        <router-link 
          :to="{name: 'cheatsheet', params: {title: sheet.url}}"
        >
          <q-card class="q-pa-md sheet-card">
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
  min-width: 25rem;
  min-height: 20rem;
  max-width: 25rem;
  max-height: 20rem;
  color: black;
}
a { text-decoration: none; }
</style>
