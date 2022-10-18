<template>
  <div v-if="noteStore.getLiteraryNotes.length === 0">
    No notes yet
  </div>

  <div v-else> 
    {{ noteStore.getLiteraryNotes }}
  </div>

</template>

<script>
import { onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useNoteStore } from "src/stores/note-store"

export default {
  setup() {
    const $q = useQuasar()
    const noteStore = useNoteStore()

    onBeforeMount(async () => {
      $q.loading.show()
      await noteStore.retrieveLiteraryNotes()
      $q.loading.hide()
    })

    return {
      noteStore,
    }
  }


}
</script>