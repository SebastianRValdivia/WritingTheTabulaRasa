<template>
  <q-page class="column items-center">
    <q-input 
      rounded
      outlined
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <ul>
      <li 
        v-for="researchProcess in displayedResearches" 
        :key="researchProcess.id"
      >
        {{ researchProcess.title }}
      </li>
    </ul>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar } from "quasar"
import Fuse from "fuse.js"

import { useResearchStore } from "src/stores/research-store"

export default {
  name: "ResearchListPage",
  setup() {
    const quasar = useQuasar()
    const researchStore = useResearchStore()

    const searchInput = ref("")

    const displayedResearches = computed(() => {
      if (searchInput.value) {
        return searchResearch(searchInput.value)
      } else return researchStore.getResearchesProcessList
    })

    function searchResearch(searchPattern) {
      let fuzzySearch = new Fuse(
        researchStore.getResearchesProcessList,
        {
          keys: [
            "title",
            "description",
          ]
        }
      )
      return fuzzySearch
        .search(searchPattern)
        .map((item) => item.item)
    }
    
    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await researchStore.retrieveResearchesProcess()
      quasar.loading.hide()
    })

    return {
      displayedResearches,
      searchInput,
    }
  }
}
</script>
