<template>
  <q-expansion-item
    dense-toggle
    switch-toggle-side
    expand-separator
    :label="props.note.title"
    :to="{name: 'note', params: {identifier: identifier}}"
    style="min-width: 20rem;"
  >
    <q-list>
      <q-item v-for="note in children" :key="note.id">
        <NoteChildren :note="note" />
      </q-item>
    </q-list>
      <q-card class="q-ml-xl">
        <q-card-section>
          <q-icon name="add" size="2rem"></q-icon>
        </q-card-section>
    </q-card>
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