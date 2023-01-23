<template>
  <q-page padding>
    <div class="row">
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn 
          round 
          color="primary" 
          icon="add" 
          size="md" 
          :to="{name: 'literaryNoteNewPage'}"
        />
      </q-page-sticky>
    </div>
    <div v-if="noteStore.getLiteraryNotes.length === 0">
      No notes yet
    </div>
    
    <div v-else> 
      {{ noteStore.getLiteraryNotes }}
    </div>
  </q-page>
</template>

<script>
import { onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useAppStore } from "src/stores/app-store"

import { useNoteStore } from "src/stores/note-store"

export default {
  setup() {
    const quasar = useQuasar()
    const appStore = useAppStore()
    const { t } = useI18n()
    const noteStore = useNoteStore()

    onBeforeMount(async () => {
      quasar.loading.show()
      appStore.setTabs({
        [t("notePages.permanent")]: "notes",
        [t("notePages.fleeting")]: "fleetingNotes",
        [t("notePages.literary")]: "literaryNotes",
      })
      await noteStore.retrieveLiteraryNotes()
      quasar.loading.hide()
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
