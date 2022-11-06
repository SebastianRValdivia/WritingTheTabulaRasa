<template>
  <q-page class="column items-center q-gutter-sm">
    <q-input v-model="newGoalInput.title"/>
    <q-input v-model="newGoalInput.result"/>
    <q-date v-model="newGoalInput.finish"/>

    <q-btn @click="submit" label="Create"/>
  </q-page>
</template>

<script>
import { reactive } from "vue"
import { date } from "quasar"

import { api } from "src/api"

export default {
  name: "ScheduleNewPage",
  setup() {
    const newGoalInput = reactive({
      title: "",
      result: "",
      finish: null
    })

    async function submit () {
      newGoalInput.finish = (
        date.formatDate(newGoalInput.finish, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      )
    }

    return {
      newGoalInput,
      submit,
    }
  }
}
</script>