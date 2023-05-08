<template>
  <q-page padding class="row">
    <SubmitBtn @click="submit" />
    <div class="col col-11">
      <q-input 
        input-class="text-h4"
        v-model="titleInput"
        :rules="[val => !!val || $t('general.required')]"
      />
    </div>
    
  </q-page>
</template>

<script>
import { ref } from "vue"

import { useQuizzStore } from "src/stores/quizz-store"
import SubmitBtn from "src/components/for-input/SubmitBtn"

export default {
  name: "QuizzEditorPage",
  components: {
    SubmitBtn
  },
  setup() {
    const quizzStore = useQuizzStore()

    const titleInput = ref("")

    async function submit() {
      if (titleInput.value) {
        let quizzData = {
          title: titleInput.value
        }
        let resultQuizzCreation = await quizzStore.createQuizzObject(quizzData)

      }
    }

    return { 
      titleInput,

      submit,
    }
  }
}
</script>
