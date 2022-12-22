<template>
  <q-page class="q-pa-md">
    <div class="row">
      <h2 class="text-h2 col-12 q-mb-md">{{ sheet.title }}</h2>
      <p v-if="sheet.description" class="text-subtitle">{{ sheet.description }}</p>
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
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { onBeforeRouteUpdate } from 'vue-router'

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"
import { cheatsheetHasSize } from "src/utils/cheatsheets"

export default {
  name: "CheatsheetPage",
  props: {
    url: String
  },
  components: {
    MarkdownPreview,
  },
  setup(props) {
    const $q = useQuasar()
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()

    const sheet = ref({})
    const cheats = ref({})

    async function loadPage(cheatUrl) {
      $q.loading.show()
      if (cheatsheetStore.getSheetByUrl(cheatUrl) === undefined) { // Sheet not in store
        let result = await cheatsheetStore.retrieveSheetByUrl(cheatUrl) // Retrieve the sheet
        sheet.value = cheatsheetStore.getSheetByUrl(cheatUrl)
        cheats.value = cheatsheetStore.getCheatsBySheetId(sheet.value.id)
      } else {
        sheet.value = cheatsheetStore.getSheetByUrl(cheatUrl)
        cheats.value = cheatsheetStore.getCheatsBySheetId(sheet.value.id)
      }
      $q.loading.hide()
    }

    onBeforeMount(() => {
      loadPage(props.url)
    })
    onBeforeRouteUpdate((to) => {
      loadPage(to.params.url)
    })

    useMeta({
      title: t("cheatSheetPage.pageTitle"),
      titleTemplate: title => `${title} - ${sheet.value.title}`,
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
