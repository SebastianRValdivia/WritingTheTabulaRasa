<template>
  <div>
    <h1>{{ note.title }} {{ note.id }}</h1>
    <MarkdownPreview :md="note.content"/>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { useRouter, onBeforeRouteUpdate } from "vue-router"

import { useNoteStore } from "src/stores/note-store"
import MarkdownPreview from "src/components/MarkdownPreview"

export default {
  props: {
    id: String
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const noteStore = useNoteStore()
    const note = ref("")
    const router = useRouter()

    const initPage = async () => {
      setNoteData()
    }

    function setNoteData() {
      if (noteStore.getNoteById(Number(props.id)) !== undefined) {
        note.value = noteStore.getNoteById(Number(props.id))
      } else {
        router.push({ name: "NotFound" })
        note.value = ""
      }
    }

    function resetNoteData(noteId) {
      const newNote = noteStore.getNoteById(noteId)
      if (newNote !== undefined) {
        note.value = newNote
      } else {
        router.push({ name: "NotFound" })
        note.value = ""
      }
    }

    onMounted(initPage)
    onBeforeRouteUpdate((to, from, next) => {
      resetNoteData(Number(to.params.id))
    })

    return {
      props,
      note,
    }
  },
}

</script>
