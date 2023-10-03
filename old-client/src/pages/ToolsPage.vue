<template>
  <q-page>
    <h5>Pomodoro timer</h5>
    <div class="q-gutter-md row items-start">
      <q-input
        v-model.number="timerSettings.workTime.value"
        type="number"
        class="setting-input col-3"
        :hint="$t('toolsPage.pomoWorkTime')"
      />
      <q-input
        v-model.number="timerSettings.restTime.value"
        type="number"
        class="setting-input col-3"
        :hint="$t('toolsPage.pomoRestTime')"
      />
      <q-btn flat round color="secondary" icon="save" @click="saveTimerSettings" />
    </div>
    
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useToolStore } from 'src/stores/tool-store'

export default {
  name: "ToolsPage",
  setup() {
    const { t } = useI18n()
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

    useMeta({
      title: t("toolsPage.pageTitle")
    })

    return {
      toolStore,
      timerSettings,
      saveTimerSettings,
    }
  }
}
</script>

<style>
.setting-input {
  max-width: 20%;
}
</style>
