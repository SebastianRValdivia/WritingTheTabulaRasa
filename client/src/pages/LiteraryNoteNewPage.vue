<template>
  <q-page padding class="column items-center">
    <q-card class="literary-note-card">
      <q-card-section
        align="right"
      >
        <LearningResourceChooser 
          @selection="assignResource"
        />
      </q-card-section>
      <q-card-section>
        <q-input 
          v-model="contentInput"
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="center" class="absolute-bottom">
        <q-btn 
          icon="done"
          rounded
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue"

import LearningResourceChooser from "src/components/for-control/LearningResourcesChooser"


export default {
  name: "LiteraryNoteNewPage",
  components: {
    LearningResourceChooser,
  },
  setup() {
    const contentInput = ref("")

    function assignResource(resourceId) {
      console.log(resourceId)
    }

    return {
      contentInput,
      assignResource,
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
