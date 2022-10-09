<template>
  <LoadingSpinner v-if="isLoading" />

  <q-page v-else>
    <div class="row q-pa-md q-gutter-sm">
      <q-input v-model="newTask.title" class="col-6 "/>
      <q-btn @click="addNewTask" icon="add" size="md"/>
    </div>
    <q-list class="row">
      <q-item class="col-12" v-for="task in displayedTasks" :key="task.id">
        <q-item-section>
          {{ task.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { ref, reactive, computed, onBeforeMount } from "vue"

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

    const newTask = reactive({
      title: "",
    })

    const displayedTasks = computed(() => {
      return taskStore.getTaskByUser(userStore.getUserId)
    })


    async function addNewTask() {
      await taskStore.addNewTask(newTask)
    }

    onBeforeMount(async () => {
      isLoading.value = true
      await taskStore.retrieveTasks()
      isLoading.value = false
    })

    return {
      isLoading,
      displayedTasks,
      taskStore,
      newTask,
      addNewTask,
    }

  }
}
</script>