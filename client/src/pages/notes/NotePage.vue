<template>
    <NoteCard 
      v-if="!isEditing" 
      :identifier="identifier"
      :title="note.title"
      :content="note.content"
    />
    
    <q-card v-else class="q-pa-sm text-center">
      <q-card-section class="text-h6">
        <span class="text-bold">{{ identifier }}:</span> <span>{{note.title}}</span>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <textarea
          id="note-textarea"
          v-model="newNoteContent"
        />
      </q-card-section>
    </q-card>
    <div 
      class="q-mt-md column content-center"
      v-if="userStore.isLogged" 
    >
      <span v-if="isEditing">
        <q-btn round color="negative" icon="cancel" @click="cancelEdit"/>
        <q-btn round color="primary" icon="save" @click="saveEdit"/>
      </span>
      <q-btn v-else round color="primary" icon="edit" @click="toggleEditor"/>
    </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { useRouter, onBeforeRouteUpdate } from "vue-router"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import NoteCard from "src/components/NoteCard"

export default {
  props: {
    identifier: String
  },
  components: {
    NoteCard,
},
  setup(props) {
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const router = useRouter()
    const note = ref({})
    const isEditing = ref(false)
    const newNoteContent = ref("")

    async function retrieveNote() {
      // Check if note is in the store
      if (noteStore.getNoteByIdentifier(props.identifier.split("-")) !== undefined) {
        note.value = noteStore.getNoteByIdentifier(props.identifier.split("-"))
      } else { // Else retrieve notes from api and try again
        await noteStore.retrieveNotes()
        if (noteStore.getNoteByIdentifier(props.identifier.split("-")) !== undefined) {
          note.value = noteStore.getNoteByIdentifier(props.identifier.split("-"))
        } else { // Note doesn't exist
          router.push({ name: "NotFound" })
          note.value = "" // To avoid an error
        }
      }
    }

    function toggleEditor() {
      newNoteContent.value = note.value.content // Reset edit content
      isEditing.value = !isEditing.value // Close editor
    }

    function cancelEdit() {
      toggleEditor()
    }

    async function saveEdit() {
      await noteStore.saveNoteContent(note.value.id, newNoteContent)
      toggleEditor()
    }

    onMounted(() => {
      retrieveNote()
    })
    onBeforeRouteUpdate((to, from, next) => {
      retrieveNote()
    })

    return {
      props,
      note,
      isEditing,
      userStore,
      newNoteContent,
      cancelEdit,
      saveEdit,
      toggleEditor,
    }
  },
}
</script>

<style>
#note-textarea {
  border: none;
  outline: none;
  min-width: 20rem;
  min-height: 20rem;
}

</style>