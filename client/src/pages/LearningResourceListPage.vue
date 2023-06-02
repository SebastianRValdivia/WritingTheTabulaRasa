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
        class="col-2"
      />
    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useResourceStore } from "src/stores/resource-store"
import LearningResourceCard from
  "src/components/for-viewing/LearningResourceCard"
import AddNewBtn from "src/components/for-input/AddNewBtn"

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
