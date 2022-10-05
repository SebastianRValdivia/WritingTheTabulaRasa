<template>
  <LoadingSpinner v-if="isLoading"/>

  <q-page v-else padding>
    <div class="row">
      <div class="column">
        <span class="text-h5">{{ $t("notePages.fleetingNotes") }}</span>
      </div>
    </div>

    <div class="row">
      <q-card 
        class="column other-note-card" 
        v-for="fleetingNote in noteStore.getFleetingNotes" 
        :key="fleetingNote.id"
      >
        <q-card-section class="q-pt-none">
          {{ fleetingNote.content }}
        </q-card-section>
      </q-card>
      <div 
        class="column other-note-card content-center q-pt-xl"
        v-if="!isAddingFleetingNote"
      >
        <q-btn icon="add" round @click="toggleNewFleetingNote"/>
      </div>
      <q-card 
        class="column other-note-card" 
        v-else
      >
        <q-card-section>
          <q-input
            v-model="newFleetingNoteContent"
            type="textarea"
            autogrow
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

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import LoadingSpinner from "src/components/LoadingSpinner"

export default {
  name: 'FleetingNotePage',
  components: {
    LoadingSpinner
  },
  setup() {
    const isLoading = ref(false)
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()

    const newFleetingNoteContent = ref("")
    const isAddingFleetingNote = ref(false)

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    function saveNewFleetingNote() {
      noteStore.createFleetingNote(newFleetingNoteContent.value)
      toggleNewFleetingNote()
    }

    onBeforeMount(async () => {
      isLoading.value = true
      appStore.setTabs({
        [t("notePages.permanent")]: "notes",
        [t("notePages.fleeting")]: "fleetingNotes",
        [t("notePages.literary")]: "literaryNotes",
      })
      await noteStore.retrieveFleetingNotes()
      isLoading.value = false
    })
    onBeforeUnmount(() => {
      appStore.clearTabs()
    })
    
    return {
      isLoading,
      newFleetingNoteContent,
      isAddingFleetingNote,
      toggleNewFleetingNote,
      saveNewFleetingNote,
      noteStore,
    }
  }
}
</script>

<style>
.other-note-card {
  min-width: 15rem;
  min-height: 15rem;
}
</style>