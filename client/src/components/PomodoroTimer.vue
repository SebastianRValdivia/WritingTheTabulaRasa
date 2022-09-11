<template>
  <q-circular-progress
      show-value
      font-size="16px"
      class="q-ma-md"
      :value="workTime"
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
import { ref } from "vue"
import { useToolStore } from "src/stores/tool-store"

export default {
  setup() {
    const workTime = ref(0.2)
    const restTime = ref(5)
    const toolStore = useToolStore()


    return {
      toolStore,
      workTime,
      restTime,

      launch() {
        if (!toolStore.getTimerStatus) { // If timer false (not running)
          toolStore.runTimer(workTime.value)
        } else { // Timer is running
          console.log("cant change")
        }
      }

    }
  }
}
</script>

<style>

</style>