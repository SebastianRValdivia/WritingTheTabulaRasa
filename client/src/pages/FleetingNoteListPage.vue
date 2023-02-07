<template>
  <q-page padding>
    <SearchInput></SearchInput>

    <div>
      <!-- List all user fleeting cards -->
      <div
        class="row q-gutter-md"
        v-if="displayedNotes.lenght > 0"
      >
        <FleetingNoteCard 
          v-for="fleetingNoteData in displayedNotes" 
          :key="fleetingNoteData.id"
          :fleetingNoteData="fleetingNoteData"
        />
      </div>

      <EmptyAlert v-else-if="!isAddingFleetingNote" />

      
      <!-- Add a fleeting note -->
      <q-page-sticky
        class="col self-center"
        v-if="!isAddingFleetingNote"
        position="top-right"
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
import FleetingNoteCard from "src/components/for-input/FleetingNoteCard"
import SearchInput from "src/components/for-input/SearchInput"
import EmptyAlert from "src/components/for-viewing/EmptyAlert"

export default {
  name: 'FleetingNotePage',
  components: {
    FleetingNoteCard,
    SearchInput,
    EmptyAlert,
  },
  setup() {
    const $q = useQuasar()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
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
      await noteStore.retrieveFleetingNotes()
      $q.loading.hide()
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
  max-width: 20rem;
  max-height: 20rem;
}
</style>
