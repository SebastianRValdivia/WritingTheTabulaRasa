import { setInterval } from "core-js";
import { defineStore } from "pinia";

export const useToolStore = defineStore("tool", {
  state: () => ({
    timer: null,
    timerStatus: false, // True = running, false = stop
    timerType: false, // True = working, false = resting
    timerTime: 3, // Minutes to run
  }),
  getters: {
    getTimerStatus: (state) => state.timerStatus,
    getTimerType: (state) => state.timerType,
    getTimerRemainingTime: (state) => state.timerTime,
  },
  actions: {
    runTimer() {
      this.timerStatus = true
      this.timer = setInterval(() => {
        this.timerTime = this.timerTime - 1
        if (this.timerTime === 0) { // Timer done
          this.timerStatus = false
          this.invertTimerType()
          alert("Timer done")
          clearInterval(this.timer)
        }
      }, 60000)
    },
    invertTimerType() {
      this.timerType = !this.timerType
    }
  },
});