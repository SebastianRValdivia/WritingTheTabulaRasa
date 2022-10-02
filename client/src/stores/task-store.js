
const { defineStore } = require("pinia");
import api from "src/api";

export const useTaskStore = defineStore("task", {
  state: () => ({
    taskList: []
  }),
  getters: {
    getTaskList: (state) => state.taskList,
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