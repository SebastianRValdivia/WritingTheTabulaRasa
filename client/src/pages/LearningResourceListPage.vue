<template>
  <q-page padding>
    <div class="col-12 row justify-center">
      <q-input 
        rounded
        outlined
        v-model="searchInput"
        class="col-4"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-page-sticky 
        position="top-right"
        :offset="[20, 20]"
      >
        <q-btn 
          round 
          icon="add"
          color="primary"
          :to="{name: 'learningResourcesEditor'}"
        />
      </q-page-sticky>
    </div>
    <div class="row">
      <q-card
        v-for="resource in displayedResources"
        :key="resource.id"
        class="col-2 resource-card"
      >
        <q-card-section>
          <div class="text-subtitle1">
            {{ resource.title }}
          </div>
          <div>
            {{ $t("general.by")}}: {{ resource.autor }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
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
    
    const searchInput = ref("")
    const displayedResources = computed(() => {
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
      searchInput,
      displayedResources,
    }

  }
}
</script>

<style scoped>
.resource-card {
  max-width: 200px;
  min-height: 300px;
}

</style>
