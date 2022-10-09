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
    }

  }
})