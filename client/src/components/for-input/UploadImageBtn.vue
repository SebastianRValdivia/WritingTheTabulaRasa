<template>
  <q-btn
    icon="add_photo_alternate"
    flat
    @click="openImageDialog"
  >
  </q-btn>
</template>

<script>
import { useQuasar } from "quasar"

import ImageUploadDialog from "src/components/for-control/ImageUploadDialog.vue"

export default {
  name: "UploadImageBtn",
  setup() {
    const quasar = useQuasar()

    function openImageDialog() {

      quasar.dialog({
        component: ImageUploadDialog
      })

    }

    return {
      openImageDialog
    }
  }
}
</script>

