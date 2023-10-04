<template>
  <!-- View mode -->
  <q-card v-if="!isEditing" class="q-pa-sm note-card-desktop" >
    <div class="column items-end">
      <span class="col row">
        <q-btn
          class="col"
          flat
          icon="more_horiz"
          size="sm"
        >
          <q-menu anchor="bottom left" self="top left">
            <q-item
              clickable
              @click="toggleEditor"
            >
              <q-item-section>
                {{ $t("general.edit") }}
              </q-item-section>
            </q-item>
            <q-item
              clickable
              @click="deleteNote"
            >
              <q-item-section
              >
                {{ $t("general.delete") }}
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
        <span class="col text-semi-transparent">
          #{{ props.noteData.id }}
        </span>
      </span>
    </div>
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span>
      <span>{{props.noteData.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.noteData.content"/>
    </q-card-section>
    <q-card-actions class="absolute-bottom q-pa-md" align="right">
      <q-btn
      v-if="props.noteData.audio !== null"
        round
        color="primary"
        :icon="isAudioPlaying ? 'pause' : 'play_arrow'"
        @click="toggleAudio"
        class="q-ma-sm"
      />
    </q-card-actions>
  </q-card>

  <!-- Editor mode -->
  <q-card v-else class="q-pa-sm note-card-desktop">
    <div class="column items-end">
      <q-btn
        round
        flat
        icon="close"
        @click="cancelEdit"
        size="sm"
      />
    </div>
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.noteData.title}}</span>
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
        <q-btn round color="primary" icon="done" @click="saveEdit"/>
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
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview.vue"
import { errorNotification } from "src/utils/notifications/"

export default {
  name: "NoteCard",
  props: {
    identifier: String,
    noteData: Object
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
      if (props.noteData.content) {
        newNoteContent.value = props.noteData.content
      } else newNoteContent.value = "" // Reset edit content
      isEditing.value = !isEditing.value // Close editor
    }
    function toggleAudio() {
      if (props.noteData.audio !== null) {
        if (noteAudio.value === null) {
          noteAudio.value = new Audio(props.noteData.audio)
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
      await noteStore.saveNoteContent(props.noteData.id, newNoteContent)
      toggleEditor()
    }
    async function deleteNote() {
      quasar.dialog({
        title: t("general.confirm"),
        message: t("noteCard.deleteAll"),
        cancel: true,
        color: "negative"
      }).onOk(async () => {
        let result = await noteStore.removeNote(props.noteData.id)
        if (result) {
          context.emit("deleted")
        } else {
        }
      })

    }


    return {
      props,
      userStore,
      isEditing,
      isAudioPlaying,
      newNoteContent,

      saveEdit,
      deleteNote,
      cancelEdit,
      toggleAudio,
      toggleEditor,
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
