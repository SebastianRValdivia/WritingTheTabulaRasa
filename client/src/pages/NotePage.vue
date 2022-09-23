<template>
  <div>
    <h3>{{note.title}}</h3>
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
    identifier: String
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const noteStore = useNoteStore()
    const note = ref({})
    const router = useRouter()

    const initPage = async () => {
      setNoteData()
    }

    function retrieveNoteByIdentifier() {
      note.value = noteStore.getNoteByIdentifier(props.identifier.split("-"))
      console.log(note.value)
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

    onMounted(() => {
      retrieveNoteByIdentifier()

    })
    onBeforeRouteUpdate((to, from, next) => {
      retrieveNoteByIdentifier()
    //   resetNoteData(Number(to.params.id))
    })

    return {
      props,
      note,
    }
  },
}

</script>
