<template>
  <q-btn round color="red" icon="alarm" @click="launch"/>
</template>

<script>
import { ref } from "vue"
import { useToolStore } from "src/stores/tool-store"

export default {
  setup() {
    const workTime = ref(1)
    const restTime = ref(5)
    const status = ref(false)
    const toolStore = useToolStore()


    return {
      workTime,
      restTime,
      status,

      launch() {
        toolStore.runTimer(workTime.value)
      }

    }
  }
}
</script>

<style>

</style>