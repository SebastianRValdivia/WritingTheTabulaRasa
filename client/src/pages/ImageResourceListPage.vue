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
        @click="copyUrlToClipboard(image.file)"
      >
        <div 
          v-if="image.caption"
          class="absolute-bottom text-subtitle1 text-center"
        >
          {{ image.caption }}
        </div>
        <q-tooltip>
          {{ image.file }}
        </q-tooltip>
      </q-img>
    </div>
    
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"

import { useResourceStore } from "src/stores/resource-store"
import { copyToClipboard } from "src/utils/clipboard"

export default {
  name: "ImageResourceListPage",
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const resourceStore = useResourceStore()

    const displayedImages = ref([])

    function copyUrlToClipboard(imageUrl) {
      copyToClipboard(imageUrl)

      quasar.notify({
        message: t("general.toClipboard"),
        color: "positive"
      })
    }

    onBeforeMount(async () => {
      quasar.loading.show()

      await resourceStore.retrieveImageResources()
      displayedImages.value = resourceStore.getImageResourceList
      
      quasar.loading.hide()
    })

    return {

      displayedImages,

      copyUrlToClipboard,

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
