<template>
  <LoadingSpinner v-if="isLoading" />
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
import { ref, onBeforeMount } from "vue"

import { useTaskStore } from "src/stores/task-store"
import LoadingSpinner from "src/components/LoadingSpinner"

export default {
  components: {
    LoadingSpinner,
},
  setup() {
    const isLoading = ref(false)
    const taskStore = useTaskStore()

    onBeforeMount(async () => {
      isLoading.value = true
      await taskStore.retrieveTasks()
      isLoading.value = false
    })

    return {
      isLoading,
      taskStore,
    }

  }
}
</script>