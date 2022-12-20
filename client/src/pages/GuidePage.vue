<template>
  <q-page class="q-pa-md">
    <h2 class="text-h2">{{guideData.title}}</h2>
    <p class="text-subtitle1">
      {{ guideData.description }}
    </p>
    <ul class="step-order">
      <li
      v-for="stepData in orderedStepsDataList"
      :key="stepData.id"
      >
        <h3 class="text-h3">
          {{ stepData.order }} - {{ stepData.title }}
        </h3>
        {{ stepData.content }}
      </li>
    </ul>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"

import api from "src/api"

export default {
  name: "GuidePage",
  props: {
    url: String
  },
  setup(props) {
    
    const guideData = ref({})
    const stepsDataList = ref([])

    const orderedStepsDataList = computed(() => {
      return [ ...stepsDataList.value, ].sort((a, b) => (a.order > b.order))
    });

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
      orderedStepsDataList,
    }
  }
}
</script>

<style lang="scss">
.step-order {
  list-style-type: none;
}
</style>
