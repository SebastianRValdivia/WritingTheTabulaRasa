<template>
  <q-dialog
    full-height
    ref="dialogRef" 
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin column full-height full-width">
      <q-card-section class="row justify-center">
        <div class="text-h6">{{ $t("metadataEditorDialog.metadata") }}</div>
      </q-card-section>

      <q-card-section class="col">
        <q-input 
          v-model="metadataInput" 
          outlined  
          autogrow
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useDialogPluginComponent } from "quasar"

export default {
  name: "MetadataEditorDialog",
  props: {
    initialData: String
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const { 
      dialogRef,
      onDialogHide,
      onDialogOK,
      onOKClick,
    } = useDialogPluginComponent()

    const metadataInput = ref("")


    onBeforeMount(() => {
      if (props.initialData) {
        metadataInput.value = props.initialData
      } else {
        metadataInput.value = "{}"
      }
    })

    return {
      props,
      metadataInput,
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK(JSON.parse(metadataInput.value))
      },
    }
  }

}
</script>

