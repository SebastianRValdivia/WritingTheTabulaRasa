<template>
  <q-page padding class="column items-center">
    <q-card>
      <q-card-section>
        <q-input v-model="titleInput"/>
        <q-input v-model="autorInput"/>
        <q-input v-model="descriptionInput" type="textarea"/>
      </q-card-section>
    </q-card>

    <q-btn
      class="q-mt-md"
      icon="done"
      color="primary"
      round
      @click="submit"
    />
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"

import { useUserStore } from "src/stores/user-store"
import { useResourceStore } from "src/stores/resource-store"

export default {
  name: "LearningResourceEditorPage",
  setup() {
    const userStore = useUserStore()
    const resourceStore = useResourceStore()
    const router = useRouter()

    const titleInput = ref("")
    const autorInput = ref("")
    const descriptionInput = ref("")

    async function submit() {
      let result = await resourceStore.saveLearningResource({
        title: titleInput.value,
        autor: autorInput.value,
        description: descriptionInput.value,
        owner: userStore.getUserId
      })

      if (result) router.push({name: "learningResources"})
    }

    return {
      titleInput,
      autorInput,
      descriptionInput,

      submit,
    }
  }
}
</script>


