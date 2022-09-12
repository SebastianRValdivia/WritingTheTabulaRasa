<template>
  <q-circular-progress
      show-value
      font-size="16px"
      class="q-ma-md"
      :value="toolStore.getTimerRemainingTime"
      :min="0"
      :max="maxTime"
      size="60px"
      :thickness="0.05"
      color="black"
      center-color="red"
      track-color="grey-3"
      @click="launch"
    >
      <span v-if="toolStore.getTimerType">
        <q-icon name="menu_book" />
      </span>
      <span v-else>
        <q-icon name="coffee" />
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

      launch() {
        if (!toolStore.getTimerStatus) { // If timer false (not running)
          toolStore.runTimer()
        } else { // Timer is running
          console.log("cant change")
        }
      }

    }
  },
}
</script>

<style>

</style>