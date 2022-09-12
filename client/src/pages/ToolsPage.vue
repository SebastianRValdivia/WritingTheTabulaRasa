<template>
  <div class="tool-box">
    <h5>Pomodoro timer</h5>
    <div class="q-gutter-md row items-start">
      <q-input
        v-model.number="timerSettings.workTime.value"
        type="number"
        filled
        class="setting-input col"
        hint="Work interval"
      />
      <q-input
        v-model.number="timerSettings.restTime.value"
        type="number"
        filled
        class="setting-input col"
        hint="Rest interval"
      />
      <q-btn flat round color="primary" icon="save" @click="saveTimerSettings" />
    </div>
    
    <PomodoroTimer />
  </div>
</template>

<script>
import { ref } from 'vue';

import { useToolStore } from 'src/stores/tool-store';
import PomodoroTimer from 'src/components/PomodoroTimer.vue';

export default {
  components: { PomodoroTimer },
  setup() {
    const toolStore = useToolStore()

    const timerSettings = {
      workTime: ref(25),
      restTime: ref(5),
    }
    function saveTimerSettings() {
      toolStore.updateTimerSettings(
        timerSettings.workTime.value,
        timerSettings.restTime.value
      )
    }

    return {
      toolStore,
      timerSettings,
      saveTimerSettings,
    }
  }
}
</script>

<style>
.tool-box {
  padding: 0.5rem;
}
.setting-input {
  max-width: 20%;
}

</style>