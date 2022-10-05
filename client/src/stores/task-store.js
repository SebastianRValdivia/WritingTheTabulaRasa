import { defineStore } from "pinia"
import api from "src/api";

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
      await api.tasks.getTasks()
        .then(result => {
          if (result.code === 200) {
            this.taskList = result.tasks
          }
        })
    }

  }
})