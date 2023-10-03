<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin scoped-card-size">
      <q-card-section>
        <q-input
          v-model="fleetingNoteInput"
          autogrow
          borderless
          autofocus
        />
      </q-card-section>
      <q-card-actions class="absolute-bottom" align="center">
        <q-btn color="primary" icon="done" flat @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useDialogPluginComponent } from 'quasar'

import { useNoteStore } from "src/stores/note-store"
import { errorNotification } from "src/utils/notifications"

export default {
  name: "FleetingNoteDialog",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup() {
    const noteStore = useNoteStore()
    const quasar = useQuasar()
    const { t } = useI18n()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const fleetingNoteInput = ref("")
    
    async function onOKClick () {
      let result = await noteStore.createFleetingNote(fleetingNoteInput.value)
      if (result) {
        onDialogOK()
      } else {
        quasar.notify(errorNotification(t("general.failed")))
      }
    }

    return {
      dialogRef,
      fleetingNoteInput,

      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel
    }
  }
}
</script> 

<style scoped>
.scoped-card-size {
  min-height: 20rem;
  max-height: 20rem;
  min-width: 30rem;
  max-width: 30rem;
}
</style>
