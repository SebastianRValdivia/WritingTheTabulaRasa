<template>
  <router-link :to="{name: 'note', params: {identifier: identifier}}">
    {{identifier}} - {{ props.note.title }} 
  </router-link>
  <ul>
    <li v-for="note in children" :key="note.id">
      <NoteChildren :note="note" />
    </li>
  </ul>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useNoteStore } from "src/stores/note-store"
import { createNoteIdentifier } from "src/utils/index"

export default {
  props: ["note"],
  setup(props) {
    const children = ref([])
    const noteStore = useNoteStore()
    const identifier = ref([])


    onBeforeMount(() => {
      children.value = noteStore.getNotesByParent(props.note.id)
      identifier.value = createNoteIdentifier(
        props.note,
        noteStore.notesList,
        [String(props.note.identifier),]
      )
    })


    return {
      props,
      children,
      identifier,
    }
    
  }

}

</script>