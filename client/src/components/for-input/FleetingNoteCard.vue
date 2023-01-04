<template>
  <q-card 
    class="column fleeting-note-card full-height" 
    :class="isEditing ? 'shadow-24' : 'shadow-4'"
  >
    <q-card-actions align="right">
      <q-btn
        :icon="isEditing ? 'cancel' :'edit'" 
        round 
        flat 
        color="primary"
        @click="editNote"
      />
      <q-btn 
        v-if="!isEditing"
        icon="delete" 
        round 
        flat 
        color="negative"
        @click="removeNote"
      />
      <q-btn
        v-else
        icon="save" 
        round 
        flat 
        color="primary"
      />
    </q-card-actions>
    <q-card-section v-if="isEditing">
      <q-input
        v-model="contentInput"
        type="textarea"
        autogrow
        borderless
        class="q-pt-xs"
      />
    </q-card-section>

    <q-card-section 
      v-else 
      class="q-pt-xs"
    >
      {{ props.fleetingNoteData.content }}
    </q-card-section>

  </q-card>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useNoteStore } from "src/stores/note-store"

export default {
  name: "FleetingNoteCard",
  props: {
    fleetingNoteData: {
      requiered: true
    }
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

    onBeforeMount(() => {
      contentInput.value = props.fleetingNoteData.content
    })

    return {
      props,
      isEditing,
      contentInput,

      editNote,
      removeNote,
    }

  }
}
</script>
