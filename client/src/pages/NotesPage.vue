<template>
 <div>
  <h1>Notes</h1>
  <ul>
    <li v-for="note in noteStore.notes" :key="note.id">
      {{ note.title }}
    </li>
  </ul>

 </div>
</template>

<script>
import { useNoteStore } from "src/stores/note-store"

export default {
  setup() {
    const noteStore = useNoteStore()
    noteStore.retrieveNotes()

    return {
      noteStore,
    }
  }

}
</script>

<style>

</style>