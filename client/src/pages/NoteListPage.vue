<template>
 <div class="column">
  <q-list id="note-list">
    <q-item v-for="note in rootNotes" :key="note.id">
      <NoteChildren :note="note" />
    </q-item>
  </q-list>
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
</style>