<template>
  <q-btn :label="btnLabel">
    <q-menu 
      auto-close
      anchor="center middle"
      self="center middle"
    >
      <q-list class="column items-center">
        <q-item
          v-for="resource in resourceStore.getLearningResources"
          :key="resource.id"
          class="col-2 resource-card"
          clickable
          @click="selectResource(resource.id)"
        >
            <q-item-section>
              <div class="text-subtitle1">
                {{ resource.title }}
              </div>
              <div>
                {{ $t("general.by")}}: {{ resource.autor }}
              </div>
            </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useResourceStore } from "src/stores/resource-store"

export default {
  name: "LearningResourcesChooser",
  emits: [
    "selection"
  ],
  setup(props, ctx) {
    const resourceStore = useResourceStore()

    const userSelection = ref()
    const btnLabel = computed(() => {
      if (userSelection.value) {
        return resourceStore.getLearningResourceById(userSelection.value).title
      } else {
        return "Resource"
      }
    })

    function selectResource(resId) {
      userSelection.value = resId
      ctx.emit("selection", resId)
    }

    onBeforeMount(async () => {
      await resourceStore.retrieveLearningResources()
    })

    return {
      resourceStore,

      btnLabel,
      selectResource,
    }

  }
}
</script>
