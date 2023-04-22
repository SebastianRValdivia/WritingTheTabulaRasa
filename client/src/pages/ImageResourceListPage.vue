<template>
  <q-page padding class="row q-gutter-md">
    <div
      v-for="image in displayedImages"
      :key="image.id"
      class="col-auto"
    >
      <q-img 
        :src="image.file"
        class="scoped-image"
      >
        <div 
          v-if="image.caption"
          class="absolute-bottom text-subtitle1 text-center"
        >
          {{ image.caption }}
        </div>
      </q-img>
    </div>
    
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import { useResourceStore } from "src/stores/resource-store"

export default {
  name: "ImageResourceListPage",
  setup() {
    const quasar = useQuasar()
    const resourceStore = useResourceStore()

    const displayedImages = ref([])


    onBeforeMount(async () => {
      quasar.loading.show()

      await resourceStore.retrieveImageResources()
      displayedImages.value = resourceStore.getImageResourceList
      
      quasar.loading.hide()
    })

    return {

      displayedImages,

    }

  }
}
</script>


<style>
.scoped-image {
  min-width: 200px;
  min-height: 200px;
}
</style>
