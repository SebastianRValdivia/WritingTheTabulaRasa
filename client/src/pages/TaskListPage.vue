<template>
  <LoadingSpinner v-if="isLoading" />

  <div v-else class="row">
    <q-list>
      <q-item v-for="task in displayedTasks" :key="task.id">
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
import { useUserStore } from "src/stores/user-store"
import LoadingSpinner from "src/components/LoadingSpinner"

export default {
  components: {
    LoadingSpinner,
},
  setup() {
    const isLoading = ref(false)
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const displayedTasks = ref([])

    onBeforeMount(async () => {
      isLoading.value = true
      await taskStore.retrieveTasks()
      displayedTasks.value = taskStore.getTaskByUser(userStore.getUserId)
      isLoading.value = false
    })

    return {
      isLoading,
      displayedTasks,
    }

  }
}
</script>