<template>
  <div v-if="noteStore.getLiteraryNotes.length === 0">
    No notes yet
  </div>

  <div v-else> 
    {{ noteStore.getLiteraryNotes }}
  </div>

</template>

<script>
import { onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useAppStore } from "src/stores/app-store"

import { useNoteStore } from "src/stores/note-store"

export default {
  setup() {
    const $q = useQuasar()
    const appStore = useAppStore()
    const { t } = useI18n()
    const noteStore = useNoteStore()

    onBeforeMount(async () => {
      $q.loading.show()
      appStore.setTabs({
        [t("notePages.permanent")]: "notes",
        [t("notePages.fleeting")]: "fleetingNotes",
        [t("notePages.literary")]: "literaryNotes",
      })
      await noteStore.retrieveLiteraryNotes()
      $q.loading.hide()
    })

    useMeta({
      title: t("literaryNoteListPage.pageTitle")
    })

    return {
      noteStore,
    }
  }


}
</script>
