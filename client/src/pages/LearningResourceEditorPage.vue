<template>
  <q-page padding class="column items-center">
    <q-card class="scoped-resource-card">
      <q-card-section>
        <q-input
          v-model="titleInput"
          :label="$t('learningResourcesEditorPage.title')"
        />
        <q-input
          v-model="descriptionInput"
          type="textarea"
          :label="$t('learningResourcesEditorPage.about')"
        />
      <div class="row justify-center">
        <OpenMetadataEditorBtn @onDone="saveMetadataInput"/>
      </div>
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
import { useQuasar } from "quasar"

import { useUserStore } from "src/stores/user-store"
import { useResourceStore } from "src/stores/resource-store"
import { useMetadataStore } from "src/stores/metadata-store"
import OpenMetadataEditorBtn from "src/components/for-input/OpenMetadataEditorBtn"

export default {
  name: "LearningResourceEditorPage",
  components: {
    OpenMetadataEditorBtn,
  },
  setup() {
    const router = useRouter()
    const quasar = useQuasar()
    const userStore = useUserStore()
    const resourceStore = useResourceStore()
    const metadataStore = useMetadataStore()

    const titleInput = ref("")
    const descriptionInput = ref("")
    const metadataInput = ref(null)

    function saveMetadataInput(metadata) {
      metadataInput.value = metadata
    }
    async function submit() {
      let data = {
        title: titleInput.value,
        description: descriptionInput.value,
        owner: userStore.getUserId
      }
      // If there is metadata first creates it and add it to the "data" payload
      if (metadataInput.value) {
        let metadataCreationResult = await metadataStore.createMetadataObject({
          content: metadataInput.value
        })
        data.metadata = metadataCreationResult.id
      }
      let result = await resourceStore.createLearningResource(data)

      if (result) router.push({name: "learningResourceListPage"})
    }

    return {
      titleInput,
      descriptionInput,
      metadataInput,

      saveMetadataInput,
      submit,
    }
  }
}
</script>

<style scoped>
.scoped-resource-card {
  min-width: 15rem;
  min-height: 25rem;
}
</style>
