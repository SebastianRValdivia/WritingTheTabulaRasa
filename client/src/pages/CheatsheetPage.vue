<template>
  <q-page class="q-pa-md">
    <div class="row">
      <h2 class="text-h2 col-12 q-mb-md">{{ sheet.title }}</h2>
      <p v-if="sheet.description" class="text-subtitle">{{ sheet.description }}</p>
    </div>

    <div class="row justify-center q-gutter-md">
      <CheatCard 
        v-for="cheat in cheats"
        :key="cheat.id"
        :cheatData="cheat"
        :color="sheet.color"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { onBeforeRouteUpdate } from 'vue-router'

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import { cheatsheetHasSize } from "src/utils/cheatsheets"
import CheatCard from "src/components/for-viewing/CheatCard"

export default {
  name: "CheatsheetPage",
  props: {
    url: String
  },
  components: {
    CheatCard,
  },
  setup(props) {
    const $q = useQuasar()
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()

    const sheet = ref({})
    const cheats = ref({})

    async function retrievePageCheats() {
      return await cheatsheetStore.retrieveCheatsBySheetId(sheet.value.id)
    }
    async function loadPage(cheatUrl) {
      $q.loading.show()
      if (cheatsheetStore.getSheetByUrl(cheatUrl) === undefined) { // Sheet not in store
        let result = await cheatsheetStore.retrieveSheetByUrl(cheatUrl) // Retrieve the sheet
        sheet.value = cheatsheetStore.getSheetByUrl(cheatUrl)
        await retrievePageCheats()
        cheats.value = cheatsheetStore.getCheatsBySheetId(sheet.value.id)
      } else {
        sheet.value = cheatsheetStore.getSheetByUrl(cheatUrl)
        await retrievePageCheats()
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
