<template>
  <q-page class="q-pl-md">
    <div class="row q-pa-md float-right">
      <q-toggle
        v-model="showCompleted"
        checked-icon="check"
        unchecked-icon="clear"
        color="info"
        :label="$t('taskListPage.showCompleted')"
      />
    </div>

    <div class="row q-gutter-sm">
      <q-input v-model="newTaskInput.titleInput" class="col-7">
        <template v-slot:prepend>
          <q-icon name="alt_route" size="sm" class="q-pa-sm">
            <q-popup-edit v-model="newTaskInput.requireInput" v-slot="scope">
              <q-input 
                v-model="scope.value"
                dense 
                type="number"
                autofocus 
                @keyup.enter="scope.set" 
                style="max-width: 8rem;"
              >
                <template v-slot:prepend>
                  <span class="text-caption">ID: </span>
                </template>
              </q-input>

            </q-popup-edit>
          </q-icon>
          <span class="q-pa-sm" v-if="newTaskInput.requireInput !== null">{{ newTaskInput.requireInput }}</span>
        </template>
      </q-input>
      <q-btn flat rounded @click="addNewTask" icon="add" size="md"/>
    </div>

    <q-list padding separator class="row ">
      <q-item class="col-7" v-for="task in displayedTasks" :key="task.id">
        <q-item-section>
          <q-item-label> 
            <q-checkbox 
              v-model="task.completed" 
              :disable="!requiredCompleted(task)"
              @click="toggleStatus(task.id)"
              class="secondary"
            />
            {{ task.title }}
          </q-item-label>
        </q-item-section>
        <q-item-section avatar>
          ID: {{ task.id }}
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
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"
import Fuse from "fuse.js"

import { useTaskStore } from "src/stores/task-store"
import { useUserStore } from "src/stores/user-store"

export default {
  setup() {
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()

    const newTaskInput = reactive({
      titleInput: "",
      requireInput: null,
    })
    const showCompleted = ref(false)
    const displayedTasks = computed(() => {
      let toDisplay = []
      if (showCompleted.value) {
        toDisplay = taskStore.getTaskByUser(userStore.getUserId)
      } else {
        toDisplay = taskStore.getTaskByUser(userStore.getUserId)
          .filter((task => task.completed === false))
      }

      return toDisplay
    })

    function requiredCompleted(task) {
      if (task.require === null) {
        return true
      } else {
        let requiredTask = taskStore.getTaskById(task.require)
        if (requiredTask.completed === true) {
          return true
        } else {
          return false
        } 
      }
    }
    async function toggleStatus(taskId) {
      let task = taskStore.getTaskById(taskId)
      if (task.require === null) {
        await taskStore.changeTaskStatus({
          taskId: taskId,
          newStatus: task.completed // The new status is already inverted due to the v-model in the checkbox
        })
      } else {
        $q.notify({
          message: t("taskListPage.requiredIncomplete"),
          color: "negative"
        })
      }
    }
    async function addNewTask() {
      if (newTaskInput.requireInput === null || taskStore.getTaskById(Number(newTaskInput.requireInput)) !== undefined) {
        await taskStore.addNewTask({
            title: newTaskInput.titleInput,
            require: newTaskInput.requireInput,
          })
      } else {
        $q.notify({
          message: t("taskListPage.requiredWrong"),
          color: "negative"
        })
      }

    }
    async function deleteTask(taskId) {
      $q.dialog({
        title: t("taskListPage.deleteTask"),
        message: t("taskListPage.deleteTaskTip")
      }).onOk(async () => {
        await taskStore.removeTask({taskId: taskId})
        $q.notify({
          message: t("taskListPage.taskDeleted"),
          color: "positive"
        })
      })
    }

    onBeforeMount(async () => {
      $q.loading.show()
      await taskStore.retrieveTasks()
      $q.loading.hide()
    })

    return {
      displayedTasks,
      taskStore,
      newTaskInput,
      addNewTask,
      toggleStatus,
      showCompleted,
      deleteTask,
      requiredCompleted,
    }
  }
}
</script>
