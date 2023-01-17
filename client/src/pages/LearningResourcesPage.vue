<template>
{{ displayedResoureces }}
</template>

<script>
import { ref, onBeforeMount, computed } from "vue"
import { useQuasar, useMeta } from "quasar"

import { useUserStore } from "src/stores/user-store"
import { useResourceStore } from "src/stores/resource-store"

export default {
  name: "LearningResourcesPage",
  setup() {
    const quasar = useQuasar()
    const userStore = useUserStore()
    const resourcesStore = useResourceStore()
    
    const displayedResoureces = computed(() => {
      let allUserResources = resourcesStore.getLearningResourcesByUser(
        userStore.getUserId
      )
      return allUserResources
    })

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await resourcesStore.retrieveLearningResources()
      quasar.loading.hide()
    })

    return {
      displayedResoureces
    }

  }
}
</script>
