<template>
  <q-page class="column items-center">
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
import { ref, onBeforeMount } from "vue"

import { useResearchStore } from "src/stores/research-store"

export default {
  name: "ResearchListPage",
  setup() {
    const researchStore = useResearchStore()

    const displayedResearches = ref([])

    onBeforeMount(async () => {
      let result = await researchStore.retrieveResearchesProcess()

      if (result) { 
        displayedResearches.value = researchStore.getResearchesProcessList
      } 
    })

    return {
      displayedResearches,
    }
  }
}
</script>
