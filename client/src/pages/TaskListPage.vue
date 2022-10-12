<template>
  <LoadingSpinner v-if="isLoading" />

  <q-page v-else>
    <div class="row q-pa-md float-right">
      <q-toggle
        v-model="showCompleted"
        checked-icon="check"
        unchecked-icon="clear"
        color="info"
        :label="$t('taskPage.showCompleted')"
      />
    </div>

    <div class="row  q-gutter-sm">
      <q-input v-model="newTask.title" class="col-7 "/>
      <q-btn flat rounded @click="addNewTask" icon="add" size="md"/>
    </div>
    <q-list padding separator class="row">
      <q-item class="col-7" v-for="task in displayedTasks" :key="task.id">
        <q-item-section>
          <q-item-label> 
            <q-checkbox 
              v-model="task.completed" 
              @click="toggleStatus(task.id)"
              class="secondary"
            />
            {{ task.title }}
          </q-item-label>
          <q-item-label caption>
            {{ task.created_at }}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-btn 
            flat 
            round 
            color="negative" 
            icon="delete" 
            @click="deleteTask(task.id)"
          />
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
    const showCompleted = ref(false)
    const displayedTasks = computed(() => {
      if (showCompleted.value) {
        return taskStore.getTaskByUser(userStore.getUserId)
      } else {
        return taskStore.getTaskByUser(userStore.getUserId)
          .filter((task => task.completed === false))
      }
    })

    async function toggleStatus(taskId) {
      let task = taskStore.getTaskById(taskId)
      await taskStore.changeTaskStatus({
        taskId: taskId,
        newStatus: task.completed // The new status is already inverted due to the v-model in the checkbox
      })
    }
    async function addNewTask() {
      await taskStore.addNewTask(newTask)
    }
    async function deleteTask(taskId) {
      await taskStore.removeTask({taskId: taskId})
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
      toggleStatus,
      showCompleted,
      deleteTask,
    }
  }
}
</script>