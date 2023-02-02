<template>
  <q-page padding>
    <div class="row justify-center">
      <q-input 
        rounded
        outlined
        v-model="searchInput"
        class="col-4"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="row q-gutter-md">
      <!-- List all user fleeting cards -->
      <FleetingNoteCard 
        v-for="fleetingNoteData in displayedNotes" 
        :key="fleetingNoteData.id"
        :fleetingNoteData="fleetingNoteData"
      />

      
      <!-- Add a fleeting note -->
      <q-page-sticky
        class="col self-center"
        v-if="!isAddingFleetingNote"
        position="bottom-right"
        :offset="[20, 20]"
      >
        <q-btn 
          icon="add" 
          round 
          color="primary"
          @click="toggleNewFleetingNote"
        />
      </q-page-sticky>
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
import Fuse from "fuse.js"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import FleetingNoteCard from "src/components/for-input/FleetingNoteCard"

export default {
  name: 'FleetingNotePage',
  components: {
    FleetingNoteCard
  },
  setup() {
    const $q = useQuasar()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()

    const contentInput = ref("")
    const isAddingFleetingNote = ref(false)
    const searchInput = ref("")
    const displayedNotes = computed(() => {
      if (searchInput.value) {
        return searchNote(searchInput.value)
      } else return noteStore.getFleetingNotesByUser(userStore.getUserId)
    })

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    function searchNote(searchPattern) {
      let fuzzySearch = new Fuse(
        noteStore.getFleetingNotesByUser(userStore.getUserId),
        {
          keys: [
            "content",
          ]
        }
      )
      return fuzzySearch
        .search(searchPattern)
        .map((item) => item.item)
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
        [t("notePages.literary")]: "literaryNoteListPage",
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
      displayedNotes,
      searchInput,
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
