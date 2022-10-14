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
      <q-input v-model="newTask.title" class="col-7">
        <template v-slot:prepend>
          <q-icon name="alt_route" size="sm" class="q-pa-sm">
            <q-popup-edit v-model="newTask.require" v-slot="scope">
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
          <span class="q-pa-sm" v-if="newTask.require !== null">{{ newTask.require }}</span>
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

import { useTaskStore } from "src/stores/task-store"
import { useUserStore } from "src/stores/user-store"

export default {
  setup() {
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const $q = useQuasar()
    const { t } = useI18n()

    const newTask = reactive({
      title: "",
      require: null,
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
      if (newTask.require === null || taskStore.getTaskById(Number(newTask.require)) !== undefined) {
        await taskStore.addNewTask(newTask)
      } else {
        $q.notify({
          message: t("taskListPage.requiredWrong"),
          color: "negative"
        })
      }

    }
    async function deleteTask(taskId) {
      await taskStore.removeTask({taskId: taskId})
    }

    onBeforeMount(async () => {
      $q.loading.show()
      await taskStore.retrieveTasks()
      $q.loading.hide()
    })

    return {
      displayedTasks,
      taskStore,
      newTask,
      addNewTask,
      toggleStatus,
      showCompleted,
      deleteTask,
      requiredCompleted,
    }
  }
}
</script>