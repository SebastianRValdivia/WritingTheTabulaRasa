<template>
  <ul v-if="cheatsheetStore.getSheets.length > 0">
    <li v-for="sheet in cheatsheetStore.getSheets" :key="sheet.id">
      <router-link :to="{name: 'cheatsheet', params: {title: sheet.url}}">
        {{ sheet.title }}
      </router-link>
    </li>
  </ul>

  <div v-else class="row justify-center">
    <h1>{{ $t("sheetPage.noSheets") }}</h1>
  </div>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="secondary" icon="add" size="md" :to="{name: 'newCheatsheet' }"/>
  </q-page-sticky>
</template>

<script>
import { onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"

export default {
  setup() {
    const $q = useQuasar()
    const cheatsheetStore = useCheatsheetStore()
    
    onBeforeMount(async () => {
      $q.loading.show()
      await cheatsheetStore.retrieveSheets()
      $q.loading.hide()
    })
    
    return {
      cheatsheetStore,
    }
  }
}
</script>