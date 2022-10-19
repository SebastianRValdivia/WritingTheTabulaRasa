<template>
  <q-card v-if="!isEditing" class="text-center note-card-desktop gt-md" >
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.note.content"/>
    </q-card-section>
    <q-card-section>
      <q-btn round color="secondary" icon="edit" @click="toggleEditor"/>
    </q-card-section>
  </q-card>
  <q-card v-else class="q-pa-sm text-center">
    <q-card-section class="text-h6">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <textarea
        id="note-textarea"
        v-model="newNoteContent"
      />
    </q-card-section>
    <div 
      class="q-mt-md column content-center"
      v-if="userStore.isLogged" 
    >
      <span>
        <q-btn round color="negative" icon="cancel" @click="cancelEdit"/>
        <q-btn round color="secondary" icon="save" @click="saveEdit"/>
      </span>
    </div>
  </q-card>


  <q-card class="text-center note-card-mobile lt-md q-ml-xl" >
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.note.identifier }}:</span> <span>{{props.note.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.content"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref  } from "vue"
import MarkdownPreview from "src/components/MarkdownPreview"

import { useUserStore } from "src/stores/user-store"
import { useNoteStore } from "src/stores/note-store"

export default {
  name: "NoteCard",
  props: {
    identifier: String,
    note: Object
  },
  components: {
    MarkdownPreview,
  },
  setup(props) {
    const userStore = useUserStore()
    const noteStore = useNoteStore()

    const isEditing = ref(false)
    const newNoteContent = ref("")

    function toggleEditor() {
      newNoteContent.value = "" // Reset edit content
      isEditing.value = !isEditing.value // Close editor
    }
    function cancelEdit() {
      toggleEditor()
    }
    async function saveEdit() {
      await noteStore.saveNoteContent(props.note.id, newNoteContent)
      toggleEditor()
    }


    return {
      props,
      isEditing,
      toggleEditor,
      userStore,
      cancelEdit,
      saveEdit,
      newNoteContent,
    }
  }
}
</script>

<style>
.note-card-desktop {
  min-width: 50rem;
  min-height: 35rem;
}
.note-card-mobile {
  min-width: 20rem;
  min-height: 25rem;
}
</style>