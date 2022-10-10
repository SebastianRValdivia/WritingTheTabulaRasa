import { defineStore } from "pinia"
import api from "src/api";

import { useUserStore } from "src/stores/user-store"

export const useTaskStore = defineStore("task", {
  state: () => ({
    taskList: []
  }),
  getters: {
    getTaskList: (state) => state.taskList,
    getTaskByUser: (state) => {
      return (userId) => state.taskList.filter((task) => task.owner === userId)
    },
    getTaskById: (state) => {
      return (taskId) => state.taskList.find((task) => task.id === taskId)
    }
  },
  actions: {
    async retrieveTasks() {
      let result = await api.tasks.getTasks()
      if (result.code === 200) {
        this.taskList = result.tasks
      }
    },
    async addNewTask(newTask) {
      const userStore = useUserStore()
      let taskData = {...newTask, ...{owner: userStore.getUserId}}
      let result = await api.tasks.postTask(taskData)
      if (result.code === 201) {
        this.taskList.push(result.newTask)
      }
    },
    async changeTaskStatus(taskData) {
      let result = await api.tasks.patchTask(
        taskData.taskId, taskData.newStatus
      )

      if (result.code === 200) {
        let index = this.taskList.findIndex(
          (task) => result.newTask.id === task.id
        )
        if (index !== -1) {
          this.taskList[index] = result.newTask
        }
      }
    }
  }
})