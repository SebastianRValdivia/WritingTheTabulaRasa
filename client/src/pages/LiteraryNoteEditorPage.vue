<template>
  <q-page padding class="column items-center">
    <q-card class="literary-note-card">
      <q-card-section>
        <q-input 
          v-model.number="positionInput"
          type="number"
        />
        <q-input 
          v-model="contentInput"
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="center" class="absolute-bottom">
        <LearningResourceChooser 
          v-model="resourceInput"
        />
      </q-card-actions>
    </q-card>
    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn 
        v-if="resourceInput"
        icon="done"
        round
        color="primary"
        @click="submit"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"

import { useUserStore } from "src/stores/user-store" 
import { useNoteStore } from "src/stores/note-store"
import LearningResourceChooser from 
  "src/components/for-control/LearningResourceChooser"


export default {
  name: "LiteraryNoteNewPage",
  components: {
    LearningResourceChooser,
  },
  setup() {
    const userStore = useUserStore()
    const noteStore = useNoteStore()
    const router = useRouter()

    const contentInput = ref("")
    const positionInput = ref(0)
    const resourceInput = ref()

    function assignResource(resourceId) {
      resourceInput.value = resourceId
    }

    async function submit() {
      let data = {
        owner: userStore.getUserId,
        content: contentInput.value,
        position: positionInput.value,
        resource: resourceInput.value,
      }
      let result = await noteStore.saveLiteraryNote(data)
      if (result) {
        router.push({name: "literaryNoteListPage"})
      }
    }

    return {
      contentInput,
      positionInput,
      resourceInput,

      assignResource,
      submit,
    }
  }
}
</script>

<style scoped>
.literary-note-card {
  min-width: 25rem;
  min-height: 30rem;
}

</style>
