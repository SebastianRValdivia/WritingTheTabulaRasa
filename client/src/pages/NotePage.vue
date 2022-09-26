<template>
  <div class="column content-center" >
    <q-card class="q-pa-xl text-center" v-if="!isEditing">
      <q-card-section class="text-h6">
        <span class="text-bold">{{ identifier }}:</span> <span>{{note.title}}</span>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <MarkdownPreview :md="note.content"/>
      </q-card-section>
    </q-card>
    <q-card v-else class="q-pa-sm text-center">
      <q-card-section class="text-h6">
        <span class="text-bold">{{ identifier }}:</span> <span>{{note.title}}</span>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <textarea
          id="note-textarea"
          v-model="note.content"
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
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { useRouter, onBeforeRouteUpdate } from "vue-router"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
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
    const userStore = useUserStore()
    const router = useRouter()
    const note = ref({})
    const isEditing = ref(false)
    const noteContent = ref("")

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
      isEditing.value = !isEditing.value
    }

    function cancelEdit() {
      toggleEditor()
    }

    function saveEdit() {
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
      noteContent,
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