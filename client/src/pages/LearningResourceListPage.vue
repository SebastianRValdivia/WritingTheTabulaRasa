<template>
  <q-page padding>

    {{ displayedLearningResources }}
    
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useResourceStore } from "src/stores/resource-store"

export default {
  name: "LearningResourceListPage",
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
