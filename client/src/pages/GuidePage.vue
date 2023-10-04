<template>
  <q-page padding class="row">
    <div class="col col-10">
      <h2 class="text-h2">{{guideData.title}}</h2>
      <p class="text-subtitle1">
        {{ guideData.description }}
      </p>
      <ul class="scoped-step-order">
        <li
          v-for="stepData in orderedStepsDataList"
          :key="stepData.id"
          ref="orderedStepsDataListRefs"
        >
          <h3 class="text-h3">
            {{ stepData.order }} - {{ stepData.title }}
          </h3>
          <MarkdownPreview
            :md="stepData.content"
          />
        </li>
      </ul>
    </div>
    <div class="col col-2 q-pt-xl">
      <ul class="scoped-step-order fixed">
          <q-item
            clickable
            v-for="(stepData, index) in orderedStepsDataList"
            :key="stepData.id"
            @click="scrollToElement(orderedStepsDataListRefs[
              index
          ])"
          class="text-subtitle1"
          >
            {{ stepData.order }} - {{ stepData.title }}
          </q-item>
      </ul>

    </div>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { scroll } from 'quasar'

import api from "src/api"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview.vue"

export default {
  name: "GuidePage",
  props: {
    url: String
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const { getScrollTarget, setVerticalScrollPosition } = scroll

    const guideData = ref({})
    const stepsDataList = ref([])
    const orderedStepsDataListRefs = ref([])

    const orderedStepsDataList = computed(() => {
      return [ ...stepsDataList.value, ].sort((a, b) => (a.order > b.order))
    })

    function scrollToElement (el) {
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 500
      setVerticalScrollPosition(target, offset, duration)
    }
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
      orderedStepsDataListRefs,

      scrollToElement,
    }
  }
}
</script>

<style lang="scss">
.scoped-step-order {
  list-style-type: none;
}
</style>
