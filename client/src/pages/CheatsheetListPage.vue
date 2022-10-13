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
import {onBeforeMount} from "vue"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"

export default {
  setup() {
    const cheatsheetStore = useCheatsheetStore()
    
    onBeforeMount(() => {
      cheatsheetStore.retrieveSheets()
    })
    
    return {
      cheatsheetStore,
    }
  }
}
</script>