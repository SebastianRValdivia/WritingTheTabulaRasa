<template>
  <q-page class="q-pa-md">
    <h2 class="text-h2">{{guideData.title}}</h2>
    <p class="text-subtitle1">
      {{ guideData.description }}
    </p>
    <ol>
      <li
      v-for="stepData in stepsDataList"
      :key="stepData.id"
      >{{ stepData.title }}</li>
    </ol>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import api from "src/api"

export default {
  name: "GuidePage",
  props: {
    url: String
  },
  setup(props) {
    
    const guideData = ref({})
    const stepsDataList = ref([])

    async function loadPage(pageUrl) {
      // Retrieve page
      let result = await api.guides.getGuideByUrl(pageUrl)
      guideData.value = result.guide

      if (result) {
        result = await api.guides.getStepsByGuideId(guideData.value.id)
        stepsDataList.value = result.steps
      }
    }

    onBeforeMount(async () => {
      let result = await loadPage(props.url)

    })
    return {
      props,
      guideData,
      stepsDataList,
    }
  }
}
</script>
