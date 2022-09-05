<template>
  <div>
    <h1>{{ note.title }} {{ props.id }}</h1>
  </div>
</template>

<script>
import { useNoteStore } from 'src/stores/note-store';

export default {
  props: {
    id: String
  },
  setup(props) {
    const noteStore = useNoteStore()
    const id = Number(props.id)
    const note = noteStore.getNoteById(id)

    return {
      props,
      note,
    }

  }
}

</script>
