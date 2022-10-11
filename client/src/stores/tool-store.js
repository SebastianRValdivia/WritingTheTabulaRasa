import { defineStore } from "pinia";

export const useToolStore = defineStore("tool", {
  state: () => ({
    timer: null,
    timerType: false, // True = working, false = resting
    timerTime: 0, // Minutes to run
    timerWorkTime: 25,
    timerRestTime: 5,
  }),
  getters: {
    getTimerType: (state) => state.timerType,
    getTimerRemainingTime: (state) => state.timerTime,
    getTimerPreset: (state) => (
      {workTime: state.timerWorkTime, restTime: state.timerRestTime }
    )
  },
  actions: {
    runTimer() {
      this.timerType 
        ? this.timerTime = this.timerWorkTime 
        : this.timerTime = this.timerRestTime
      this.timer = setInterval(() => {
        this.timerTime = this.timerTime - 1
        if (this.timerTime === 0) { // Timer done
          alert("Timer done")
          clearInterval(this.timer)
          this.invertTimerType()
        }
      }, 60000)
    },
    invertTimerType() {
      this.timerType = !this.timerType
    },
    updateTimerSettings(workTime, restTime) {
      this.timerWorkTime = workTime
      this.timerRestTime = restTime
    },
    stopTimer() {
      this.timer = null
      this.timerTime = 0
      this.invertTimerType()
    },
  },
});