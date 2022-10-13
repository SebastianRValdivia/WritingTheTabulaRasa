<template>
  <q-page class="q-pa-md">
    <div class="row">
      <h2>{{ sheet.title }}</h2>
    </div>

    <div class="row q-gutter-md">
      <q-card class="cheat-card" v-for="cheat in cheats" :key="cheat.id">
        <q-card-section>
          <h5>{{ cheat.title }}</h5>
        </q-card-section>
        <q-card-section>
          <MarkdownPreview :md="cheat.content" />
        </q-card-section>
      </q-card>


    </div>


  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"

export default {
  props: {
    title: String
  },
  components: {
    MarkdownPreview,
},
  setup(props) {
    const $q = useQuasar()
    const cheatsheetStore = useCheatsheetStore()

    const sheet = ref({})
    const cheats = ref({})

    onBeforeMount(async () => {
      $q.loading.show()
      await cheatsheetStore.retrieveCheats()
      sheet.value = cheatsheetStore.getSheetByUrl(props.title)
      cheats.value = cheatsheetStore.getCheatsBySheet(sheet.value.id)
      $q.loading.hide()
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