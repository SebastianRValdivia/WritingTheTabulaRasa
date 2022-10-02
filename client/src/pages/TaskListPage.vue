<template>
  <div class="row">
    <q-list>
      <q-item v-for="task in taskStore.getTaskList" :key="task.id">
        <q-item-section>
          {{ task.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { onBeforeMount } from "vue"

import { useTaskStore } from "src/stores/task-store"

export default {
  setup() {
    const taskStore = useTaskStore()

    onBeforeMount(() => {
      taskStore.retrieveTasks()
    })

    return {
      taskStore,
    }

  }
}
</script>