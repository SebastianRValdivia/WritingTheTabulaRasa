<template>
  <q-card 
    class="column fleeting-note-card" 
  >
    <q-card-actions align="right">
      <q-btn 
        icon="delete" 
        round 
        flat 
        color="negative"
        @click="removeNote"
      />
    </q-card-actions>
    <q-card-section class="q-pt-xs">
      {{ props.fleetingNoteData.content }}
    </q-card-section>
  </q-card>
</template>

<script>
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

    async function removeNote() {
      let result = await noteStore.removeFleetingNote(props.fleetingNoteData.id)
    }
    return {
      props,
      removeNote,
    }

  }
}
</script>
