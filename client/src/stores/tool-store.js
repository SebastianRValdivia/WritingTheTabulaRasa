import { defineStore } from "pinia";

export const useToolStore = defineStore("tool", {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    runTimer(timeInMinutes) {
      let timeInMilliseconds = timeInMinutes * 60000
      setTimeout(() => {
        alert("Timer Done")
      }, timeInMilliseconds)
    },
  },
});