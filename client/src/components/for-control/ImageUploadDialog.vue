<template>
  <q-dialog 
    v-model="isOpen" 
    persistent 
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

import api from "src/api"

export default {
  setup() {
    const isOpen = ref(true)
    const imageInput = ref(null)
    const captionInput = ref("")

    async function submit() {
      let result = await api.resources.postImageResource({
        caption: captionInput.value,
        file: imageInput.value
      })

      result ? isOpen.value = false : isOpen.value = true

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
