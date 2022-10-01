<template>
  <div v-if="isLoading" class="window-height row justify-center items-center">
    <q-spinner-rings
      color="primary"
      size="10rem"
    />
  </div>

  <div v-else>
    <div class="row">
      <q-list id="note-list" class="column">
        <q-item v-for="note in rootNotes" :key="note.id">
          <NoteChildren :note="note" />
        </q-item>
      </q-list>
      <q-separator vertical/>
      <router-view ></router-view>
    </div>


    <br />
    <q-separator />
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

  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import NoteChildren from "src/components/for-pages/NoteChildren"

export default {
  components: {
    NoteChildren
  },
  setup() {
    const isLoading = ref(false)
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const rootNotes = ref([])
    const newFleetingNoteContent = ref("")
    const isAddingFleetingNote = ref(false)

    function filterUserNotes() {
      rootNotes.value = noteStore.getNotesByUser(userStore.getUserId)
        .filter(note => note.parent == null)
    }

    function filterNotes() {
        rootNotes.value = noteStore.notesList
          .filter(note => note.parent == null)
    }

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    function saveNewFleetingNote() {
      noteStore.createFleetingNote(newFleetingNoteContent.value)
      toggleNewFleetingNote()

    }

    onBeforeMount(async () => {
      isLoading.value = true
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterUserNotes()
      } else {
        filterNotes()
      }
      await noteStore.retrieveFleetingNotes()
      isLoading.value = false
    })


    return {
      isLoading,
      noteStore,
      rootNotes,
      newFleetingNoteContent,
      isAddingFleetingNote,
      toggleNewFleetingNote,
      saveNewFleetingNote,
    }
  }

}
</script>

<style>
#note-list {
  max-width: fit-content;
}
.other-note-card {
  min-width: 15rem;
  min-height: 15rem;
}
</style>