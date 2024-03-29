<template>
  <q-page padding>
    <div class="col-12 row justify-center">
      <div
        v-if="selectedLearningResourcesList.length >= 1"
        class="column justify-center q-pr-md"
      >
        <q-btn
          icon="delete"
          rounded
          @click="deleteSelectedResources"
        />
      </div>
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
    <div v-if="displayedResources">
      <EmptyMsg />
    </div>
    <div class="row q-gutter-md q-pt-md" v-else>
      <q-card
        v-for="resource in displayedResources"
        :key="resource.id"
        class="col-2 resource-card"
        :class="selected(resource.id) ? 'shadow-15' : 'shadow-5'"
        @click="select(resource.id)"
      >
        <q-card-section>
          <div class="text-subtitle1">
            {{ resource.title }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useUserStore } from "src/stores/user-store"
import { useResourceStore } from "src/stores/resource-store"
import EmptyMsg from "src/components/for-viewing/EmptyMsg.vue"

export default {
  name: "LearningResourcesPage",
  components: {
    EmptyMsg,
  },
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const resourcesStore = useResourceStore()

    const selectedLearningResourcesList = ref([])
    const searchInput = ref("")
    const displayedResources = computed(() => {
      let allUserResources = []
      for (let resourceId of resourcesStore.getUserAssignedLearningResources) {
        allUserResources.push(resourcesStore.getLearningResourceById(resourceId))
      }
      return allUserResources
    })

    function selected(resourceId) {
      return selectedLearningResourcesList.value.find(
        listedResourceId => listedResourceId === resourceId
      )
    }
    function select(resourceId) {
      selectedLearningResourcesList.value.push(resourceId)
    }
    async function deleteSelectedResources() {
      quasar.dialog({
        message: t("general.sureDelete"),
        cancel: true,
      }).onOk(() => {
        for (let resourceId of selectedLearningResourcesList.value) {
          resourcesStore.removeLearningResourceById(resourceId)
        }
        selectedLearningResourcesList.value = []
      })
    }
    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await resourcesStore.retrieveLearningResources()
      if (result) await resourcesStore.retrieveUserAssignedLearningResources()
      if (result) {
        quasar.loading.hide()
      }
    })

    return {
      searchInput,
      displayedResources,
      selectedLearningResourcesList,

      select,
      selected,
      deleteSelectedResources,
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
