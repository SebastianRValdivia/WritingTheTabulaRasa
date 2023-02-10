<template>
  <q-card v-if="!isEditing" class="q-pa-sm note-card-desktop" >
    <div class="column items-end text-semi-transparent">
      #{{ props.note.id }}
    </div>
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.note.content"/>
    </q-card-section>
    <q-card-actions class="absolute-bottom q-pa-md" align="right">
      <q-btn round color="primary" icon="edit" @click="toggleEditor"/>
      <q-btn 
      v-if="props.note.audio !== null" 
        round 
        color="primary" 
        :icon="isAudioPlaying ? 'pause' : 'play_arrow'"
        @click="toggleAudio"
        class="q-ma-sm"
      />
    </q-card-actions>
  </q-card>
  <q-card v-else class="q-pa-sm note-card-desktop">
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.note.title}}</span>
      <q-space />
      <q-btn round color="negative" icon="delete" @click="deleteNote"/>
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
          class="q-ma-sm"
        />
        <q-btn round color="primary" icon="save" @click="saveEdit"/>
      </span>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"

import { useUserStore } from "src/stores/user-store"
import { useNoteStore } from "src/stores/note-store"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"
import { errorNotification } from "src/utils/notifications/"

export default {
  name: "NoteCard",
  props: {
    identifier: String,
    note: Object
  },
  components: {
    MarkdownPreview,
  },
  emits: [
    "deleted",
  ],
  setup(props, context) {
    const userStore = useUserStore()
    const noteStore = useNoteStore()
    const quasar = useQuasar()
    const { t } = useI18n()

    const isEditing = ref(false)
    const newNoteContent = ref("")
    const noteAudio = ref(null)
    
    const isAudioPlaying = computed(() => {
      if (noteAudio.value === null) {
        return false
      } else if (noteAudio.value.paused === true) {
        return false
      } else {
        return true
      }
    })

    function toggleEditor() {
      newNoteContent.value = "" // Reset edit content
      isEditing.value = !isEditing.value // Close editor
    }
    function toggleAudio() {
      if (props.note.audio !== null) {
        if (noteAudio.value === null) {
          noteAudio.value = new Audio(props.note.audio)
        }
        if (noteAudio.value.paused === true) {
          noteAudio.value.play()
        } else {
          noteAudio.value.pause()
        }
      }
    }
    function cancelEdit() {
      toggleEditor()
    }
    async function saveEdit() {
      await noteStore.saveNoteContent(props.note.id, newNoteContent)
      toggleEditor()
    }
    async function deleteNote() {
      quasar.dialog({
        title: t("general.confirm"),
        message: t("noteCard.deleteAll"),
        cancel: true,
        color: "negative"
      }).onOk(async () => {
        let result = await noteStore.removeNote(props.note.id)
        if (result) {
          context.emit("deleted")
        } else {
        }
      })

    }


    return {
      props,
      isEditing,
      toggleEditor,
      userStore,
      cancelEdit,
      saveEdit,
      newNoteContent,
      deleteNote,
      toggleAudio,
      isAudioPlaying,
    }
  }
}
</script>

<style>
.note-card-desktop {
  min-width: 50rem;
  min-height: 35rem;
}
</style>
