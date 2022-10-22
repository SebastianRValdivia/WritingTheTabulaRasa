<template>
  <q-card v-if="!isEditing" class="q-pa-sm note-card-desktop gt-md" >
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
      <q-space />
      <q-btn round color="primary" icon="edit" @click="toggleEditor"/>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.note.content"/>
    </q-card-section>
  </q-card>
  <q-card v-else class="q-pa-sm note-card-desktop gt-md">
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        type="textarea"
        v-model="newNoteContent"
        autogrow 
        borderless
      />
    </q-card-section>
    <q-card-actions
      class="q-mt-md absolute-bottom"
      align="right"
      v-if="userStore.isLogged" 
    >
      <span>
        <q-btn 
          round 
          color="negative" 
          icon="cancel" 
          @click="cancelEdit"
          class="q-mr-sm"
        />
        <q-btn round color="primary" icon="save" @click="saveEdit"/>
      </span>
    </q-card-actions>
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