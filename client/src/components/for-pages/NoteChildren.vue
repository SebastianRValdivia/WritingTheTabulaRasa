<template>
  <q-expansion-item
    dense-toggle
    switch-toggle-side
    expand-separator
    :label="props.note.title"
    :to="{name: 'note', params: {identifier: identifier}}"
  >
    <q-list>
      <q-item v-for="note in children" :key="note.id">
        <NoteChildren :note="note" />
      </q-item>
    </q-list>
  </q-expansion-item>
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