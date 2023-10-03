<template>
  <q-page padding>
    <SearchInput @search="searchResearches"/>
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

import { useResearchStore } from "src/stores/research-store"
import SearchInput from "src/components/for-input/SearchInput"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  name: "ResearchListPage",
  components: {
    SearchInput
  },
  setup() {
    const quasar = useQuasar()
    const researchStore = useResearchStore()

    const searchInput = ref("")

    const displayedResearches = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          researchStore.getResearchesProcessList,
          searchInput.value,
          ["title"]
        )
      } else return researchStore.getResearchesProcessList
    })

    function searchResearches(searchPattern) {
      searchInput.value = searchPattern
    }
    
    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await researchStore.retrieveResearchesProcess()
      quasar.loading.hide()
    })

    return {
      displayedResearches,

      searchResearches,
    }
  }
}
</script>
