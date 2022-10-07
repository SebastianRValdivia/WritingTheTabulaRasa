import { defineStore } from "pinia"
import api from "src/api";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    goalsList: [],
    objectivesList: []
  }),
  getters: {
    getGoalsList: (state) => state.goalsList,
    getObjectivesList: (state) => state.objectivesList,
  },
  actions: {
    async retrieveGoals() {
      let result = await api.schedule.getGoals()

      if (result.code === 200) {
        this.goalsList = result.goals
        return true
      } else {
        return false
      }
    },
    async retrieveObjectives() {
      let result = await api.schedule.getObjectives()
      if (result.code === 200) {
        this.objectivesList = result.objectives
        return true
      } else {
        return false
      }
    }
  }
})