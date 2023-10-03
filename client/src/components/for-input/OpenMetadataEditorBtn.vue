<template>
  <q-btn icon="data_object" @click="openMetadataEditor"/>
</template>

<script>
import { useQuasar } from "quasar"

import MetadataEditorDialog from "src/components/for-input/MetadataEditorDialog"

export default {
  name: "OpenMetadataEditorBtn",
  emits: ["onDone"],
  setup(props, ctx) {
    const quasar = useQuasar()

    async function openMetadataEditor() {
      quasar.dialog({
        component: MetadataEditorDialog
      }).onOk(async (metadataObject) => {
        ctx.emit("onDone", metadataObject)
      })
    }

    return {
      openMetadataEditor,
    }

  }
}
</script>
