<template>
  <router-link :to="{name: 'note', params: {identifier: props.note.id}}">
    {{ props.note.title }} 
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

export default {
  props: ["note"],
  setup(props) {
    const children = ref([])
    const noteStore = useNoteStore()

    function filterChildren() {
      children.value = noteStore.getNotesByParent(props.note.id)
    }

    onBeforeMount(() => {
      filterChildren()      
    })


    return {
      props,
      children,
    }
    
  }

}

</script>