<template>
  <q-page class="q-pa-md">
    <div class="row">
      <h2>{{ sheet.title }}</h2>
    </div>

    <div class="row col-auto q-col-gutter-sm">
      <q-card class="cheat-card" v-for="cheat in cheats" :key="cheat.id">
        <h5>{{ cheat.title }}</h5>
      </q-card>

    </div>


  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"

export default {
  props: {
    title: String
  },
  setup(props) {
    const cheatsheetStore = useCheatsheetStore()
    const sheet = ref({})
    const cheats = ref({})

    onBeforeMount(async () => {
      await cheatsheetStore.retrieveCheats()
      sheet.value = cheatsheetStore.getSheetByUrl(props.title)
      cheats.value = cheatsheetStore.getCheatsBySheet(sheet.value.id)
    })



    return {
      cheats,
      sheet,
    }
  }

}

</script>

<style>
.cheat-card {
  min-width: 15%;
}
</style>