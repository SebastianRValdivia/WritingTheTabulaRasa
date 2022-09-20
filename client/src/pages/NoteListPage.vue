<template>
 <div>
  <h1>Notes</h1>
  <ul>
    <li v-for="note in notesToDisplay" :key="note.id">
      <router-link :to="{name: 'note', params: {id: note.id}}">
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
    const notesToDisplay = ref([])

    function filterNotesByLoggedUser() {
      notesToDisplay.value = noteStore.getNotesByUser(userStore.getUserId)
    }

    onBeforeMount(async () => {
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterNotesByLoggedUser()
      } else {
        notesToDisplay.value = noteStore.notesList
      }
    })


    return {
      noteStore,
      notesToDisplay,
    }
  }

}
</script>

<style>

</style>