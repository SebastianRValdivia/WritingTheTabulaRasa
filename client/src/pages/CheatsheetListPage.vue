<template>
  <ul>
    <li v-for="sheet in cheatsheetStore.getSheets" :key="sheet.id">
      <router-link :to="{name: 'cheatsheet', params: {title: sheet.url}}">
        {{ sheet.title }}
      </router-link>
    </li>

  </ul>
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