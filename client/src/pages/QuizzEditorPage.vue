<template>
  <q-page padding class="row">
    <div class="col col-12">
      <q-input 
        input-class="text-h4"
        v-model="titleInput"
        :rules="[val => !!val || 'Field is required']"
      />
    </div>
    
  </q-page>
</template>

<script>
import { ref } from "vue"
export default {
  name: "QuizzEditorPage",
  setup() {
    const titleInput = ref("")

    return { 
      titleInput
    }
  }
}
</script>
