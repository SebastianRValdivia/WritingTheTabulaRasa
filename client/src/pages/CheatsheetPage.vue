<template>
  <q-page class="q-pa-md">
    <div class="row">
      <h2>{{ sheet.title }}</h2>
    </div>

    <div class="row q-gutter-md">
      <div 
        v-for="cheat in cheats"
        :key="cheat.id"
        :class="cheatsheetHasSize(cheat.size)"
      >
        <div>
          <h5>{{ cheat.title }}</h5>
        </div>
        <div>
          <MarkdownPreview :md="cheat.content" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"
import { cheatsheetHasSize } from "src/utils/cheatsheets"

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
      cheatsheetHasSize,
    }
  }

}

</script>

<style>
.cheat-card {
  min-width: 15%;
  max-width: 50%;
}
</style>
