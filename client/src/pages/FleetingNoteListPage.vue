<template>
  <q-page padding>
    <SearchInput @search="searchFleetingNotes"/>
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
    <div 
      class="row justify-center q-pa-md"
      v-else
    >
      <q-card 
        class="column fleeting-note-card animated fadeInDown" 
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

    <!-- List all user fleeting cards -->
    <div
      class="row q-gutter-md animated"
      v-if="displayedNotes.length > 0"
      :class="{'fadeInDown': isAddingFleetingNote}"
    >
      <FleetingNoteCard 
        v-for="fleetingNoteData in displayedNotes" 
        :key="fleetingNoteData.id"
        :fleetingNoteData="fleetingNoteData"
      />
    </div>
    <EmptyAlert v-else-if="!isAddingFleetingNote" />
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"
import Fuse from "fuse.js"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"
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
        return fuzzySearchByObjectByKeys(
        noteStore.getFleetingNotesByUser(userStore.getUserId),
        searchInput.value,
        ["content"]
      )
      } else return noteStore.getFleetingNotesByUser(userStore.getUserId)
    })

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    function searchFleetingNotes(searchPattern) {
      searchInput.value = searchPattern
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

      searchFleetingNotes,
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
