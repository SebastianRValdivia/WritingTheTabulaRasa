<template>
  <q-card 
    class="column fleeting-note-card full-height" 
    :class="isEditing ? 'shadow-24' : 'shadow-4'"
  >
    <q-card-section v-if="isEditing">
      <q-input
        v-model="contentInput"
        autofocus
        type="textarea"
        autogrow
        borderless
        @blur="saveEdit"
      />
    </q-card-section>

    <q-card-section 
      v-else 
      class="q-pt-xs"
      @click="editNote"
    >
      <MarkdownPreview
        :md="props.fleetingNoteData.content"
      />
    </q-card-section>
    <q-card-actions align="right" class="absolute-bottom">
      <q-btn 
        v-if="!isEditing"
        icon="delete" 
        round 
        flat 
        color="negative"
        @click="removeNote"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useNoteStore } from "src/stores/note-store"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

export default {
  name: "FleetingNoteCard",
  props: {
    fleetingNoteData: {
      requiered: true
    }
  },
  components: {
    MarkdownPreview,
  },
  setup(props) {
    const noteStore = useNoteStore()

    const isEditing = ref(false)
    const contentInput = ref("")

    async function removeNote() {
      let result = await noteStore.removeFleetingNote(props.fleetingNoteData.id)
    }
    function editNote() {
      isEditing.value = !isEditing.value
    }
    async function saveEdit() {
      let result = await noteStore.updateFleetingNote(
        props.fleetingNoteData.id,
        contentInput.value,
      )
      isEditing.value = false
    }

    onBeforeMount(() => {
      contentInput.value = props.fleetingNoteData.content
    })

    return {
      props,
      isEditing,
      contentInput,

      editNote,
      removeNote,
      saveEdit,
    }

  }
}
</script>
