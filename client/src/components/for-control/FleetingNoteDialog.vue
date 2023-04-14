<template>
  <!-- notice dialogRef here -->
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
import { useDialogPluginComponent } from 'quasar'

export default {
  name: "FleetingNoteDialog",
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const fleetingNoteInput = ref("")
    
      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
    function onOKClick () {
      // on OK, it is REQUIRED to
      // call onDialogOK (with optional payload)
      onDialogOK()
      // or with payload: onDialogOK({ ... })
      // ...and it will also hide the dialog automatically
    }

    return {
      dialogRef,
      onDialogHide,
      fleetingNoteInput,

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
