<template>
  <q-page padding>
    <div class="row justify-center">
      <span class="text-h4">{{ $t("notePages.fleetingNotes") }}</span>
    </div>

    <div class="row q-gutter-md">
      <!-- List all user fleeting cards -->
      <q-card 
        class="column fleeting-note-card" 
        v-for="fleetingNote in noteStore.getFleetingNotes" 
        :key="fleetingNote.id"
      >
        <q-card-section class="q-pt-xs">
          {{ fleetingNote.content }}
        </q-card-section>
      </q-card>
      
      <!-- Add a fleeting note -->
      <div 
        class="col self-center"
        v-if="!isAddingFleetingNote"
      >
        <q-btn icon="add" round @click="toggleNewFleetingNote"/>
      </div>
      <q-card 
        class="column fleeting-note-card" 
        v-else
      >
        <q-card-section>
          <q-input
            v-model="contentInput"
            type="textarea"
            autogrow
            borderless
          />
        </q-card-section>
        <q-card-actions align="right" class="absolute-bottom">
          <q-btn round icon="cancel" @click="toggleNewFleetingNote"/>
          <q-btn round icon="check" @click="saveNewFleetingNote"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"

export default {
  name: 'FleetingNotePage',
  setup() {
    const $q = useQuasar()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()

    const contentInput = ref("")
    const isAddingFleetingNote = ref(false)

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    async function saveNewFleetingNote() {
      let result = await noteStore.createFleetingNote(contentInput.value)
      if (result) {
        contentInput.value = ""
        toggleNewFleetingNote()
      }
    }

    onBeforeMount(async () => {
      $q.loading.show()
      appStore.setTabs({
        [t("notePages.permanent")]: "notes",
        [t("notePages.fleeting")]: "fleetingNotes",
        [t("notePages.literary")]: "literaryNotes",
      })
      await noteStore.retrieveFleetingNotes()
      $q.loading.hide()
    })
    onBeforeUnmount(() => {
      appStore.clearTabs()
    })

    useMeta({
      title: t("fleetingNoteListPage.pageTitle")
    })
    
    return {
      contentInput,
      isAddingFleetingNote,
      toggleNewFleetingNote,
      saveNewFleetingNote,
      noteStore,
    }
  }
}
</script>

<style>
.fleeting-note-card {
  min-width: 20rem;
  min-height: 20rem;
}
</style>
