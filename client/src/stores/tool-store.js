import { defineStore } from "pinia";

export const useToolStore = defineStore("tool", {
  state: () => ({
    timerStatus: false, // True = running, false = stop
    timerType: false, // True = working, false = resting
  }),
  getters: {
    getTimerStatus: (state) => state.timerStatus,
    getTimerType: (state) => state.timerType,
  },
  actions: {
    runTimer(timeInMinutes) {
      this.timerStatus = true
      let timeInMilliseconds = timeInMinutes * 60000
      setTimeout(() => {
        alert("Timer Done")
        this.timerStatus = false
        this.invertTimerType()
      this.timerType = !this.timerType
      }, timeInMilliseconds)
    },
    invertTimerType() {
    }
  },
});