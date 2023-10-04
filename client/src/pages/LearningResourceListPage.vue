<template>
  <q-page padding class="row">
    <AddNewBtn :to="{name: 'learningResourcesEditorPage'}"/>
    <div
      v-for="learningResource in displayedLearningResources"
      :key="learningResource.id"
      class="col column items-center q-gutter-md"
    >
      <LearningResourceCard
        :title="learningResource.title"
        class="col-2 scoped-resource-card"
      />
    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useResourceStore } from "src/stores/resource-store"
import LearningResourceCard from
  "src/components/for-viewing/LearningResourceCard.vue"
import AddNewBtn from "src/components/for-input/AddNewBtn.vue"

export default {
  name: "LearningResourceListPage",
  components: {
    LearningResourceCard,
    AddNewBtn,
  },
  setup() {
    const resourceStore = useResourceStore()
    const quasar = useQuasar()

    const displayedLearningResources = computed(() => {
      return resourceStore.getLearningResources
    })

    onBeforeMount(async () => {
      quasar.loading.show()

      let result = await resourceStore.retrieveLearningResources()

      if (result) {
        quasar.loading.hide()
      }

    })

    return {
      displayedLearningResources,
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
