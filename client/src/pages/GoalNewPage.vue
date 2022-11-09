<template>
  <q-page class="column items-center q-gutter-sm">
    <q-input v-model="newGoalInput.title"/>
    <q-input
      v-model="newGoalInput.result"
      type="textarea"
      autogrow
      style="min-width: 300px"
    />
    <q-date v-model="newGoalInput.finish"/>

    <q-btn @click="createGoal" label="Create"/>
  </q-page>
</template>

<script>
import { reactive } from "vue"
import { useQuasar, date } from "quasar"
import { useI18n } from "vue-i18n"

import { useScheduleStore } from "src/stores/schedule-store"

export default {
  name: "ScheduleNewPage",
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const scheduleStore = useScheduleStore()

    const newGoalInput = reactive({
      title: "",
      result: "",
      finish: null
    })

    async function createGoal () {
      if (!newGoalInput.title || !newGoalInput.result || !newGoalInput.finish) {
        quasar.notify({
          color: "negative",
          message: t("goalNewPage.error")
        })               
        return 
      }
      newGoalInput.finish = (
        date.formatDate(newGoalInput.finish, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      )
      scheduleStore.createGoal(newGoalInput)
    }

    return {
      newGoalInput,
      createGoal,
    }
  }
}
</script>