<template>
  <q-circular-progress
      show-value
      font-size="18px"
      class="q-ma-md"
      :value="toolStore.getTimerRemainingTime"
      :min="0"
      :max="maxTime"
      size="32px"
      :thickness="0.2"
      color="secondary"
      center-color="red"
      track-color=""
      @click="launch"
      @mouseenter="mouseOver = true"
      @mouseleave="mouseOver = false"
    >
      <span v-if="toolStore.getTimerType">
        <q-icon v-if="mouseOver && toolStore.getTimerRemainingTime > 0" name="close" />
        <q-icon v-else name="menu_book" />
      </span>
      <span v-else>
        <q-icon v-if="mouseOver && toolStore.getTimerRemainingTime > 0" name="close" />
        <q-icon v-else name="coffee" />
      </span>
    </q-circular-progress>
</template>

<script>
import { onMounted, ref } from "vue"

import { useToolStore } from "src/stores/tool-store"

export default {
  setup() {
    const toolStore = useToolStore()
    const maxTime = ref(0) 
    const mouseOver= ref(false)


    function defineMaxTime() {
      toolStore.getTimerType 
        ? maxTime.value = toolStore.getTimerPreset.workTime
        : maxTime.value = toolStore.getTimerPreset.restTime
    }

    onMounted(() =>  {
      defineMaxTime()
    })

    return {
      toolStore,
      maxTime,
      mouseOver,

      launch() {
        if (toolStore.getTimerRemainingTime === 0) {
          toolStore.runTimer()
        } else { // Timer is running
          toolStore.stopTimer()
        }
      }

    }
  },
}
</script>

<style>

</style>