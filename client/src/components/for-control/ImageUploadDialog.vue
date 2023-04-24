<template>
  <q-dialog 
    v-model="isOpen" 
    @keyup.enter="submit"
  >
    <q-card>
      <q-card-section class="column items-center image-card">
        <q-form>
          <q-file
            v-model="imageInput"
            filled
            accept=".jpg, image/*"
          >
            <template v-slot:append>
              <q-icon name="add_photo_alternate" />
            </template>
          </q-file>

          <q-input
            v-model="captionInput"
            :label="$t('imageUploadDialog.caption')"
            stack-label
            autogrow
          >
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions class="column items-center">
        <q-btn
          icon="file_upload"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue"

import { useResourceStore } from "src/stores/resource-store"
import { copyToClipboard } from "src/utils/clipboard"

export default {
  setup() {
    const resourceStore = useResourceStore()

    const isOpen = ref(true)
    const imageInput = ref(null)
    const captionInput = ref("")

    async function submit() {
      let result = await resourceStore.createImageResource({
        caption: captionInput.value,
        file: imageInput.value
      })

      if (result) {
        copyToClipboard(result.file)
        isOpen.value = false
      } else {
        isOpen.value = true
      }
    }

    return {
      isOpen,
      imageInput,
      captionInput,
      submit,
    }
  }
}
</script>

<style>
.image-card {
  min-width: 10rem
}
</style>
