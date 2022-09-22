<template>
 <div>
  <h1>Notes</h1>
  <ul>
    <li v-for="note in rootNotes" :key="note.id">
      <router-link :to="{name: 'note', params: {identifier: note.id}}">
        {{ note.title }} 
      </router-link>
    </li>
  </ul>

 </div>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"

export default {
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

</style>