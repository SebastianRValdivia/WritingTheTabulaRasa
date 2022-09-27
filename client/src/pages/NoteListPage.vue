<template>
  <div class="row">
    <q-list id="note-list" class="column">
      <q-item v-for="note in rootNotes" :key="note.id">
        <NoteChildren :note="note" />
      </q-item>
    </q-list>
    <q-separator vertical/>
  </div>

  <br />
  <q-separator />

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
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const rootNotes = ref([])

    function filterUserNotes() {
      rootNotes.value = noteStore.getNotesByUser(userStore.getUserId)
        .filter(note => note.parent == null)
    }

    function filterNotes() {
        rootNotes.value = noteStore.notesList
          .filter(note => note.parent == null)
    }

    onBeforeMount(async () => {
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterUserNotes()
      } else {
        filterNotes()
      }
      await noteStore.retrieveFleetingNotes()
    })


    return {
      noteStore,
      rootNotes,
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