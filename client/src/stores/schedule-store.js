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
      await api.schedule.getGoals()
        .then( result => {
          if (result.code === 200) {
            this.goalsList = result.goals
            return true
          } else {
            return false
          }
        })
    },
    async retrieveObjectives() {
      await api.schedule.getObjectives()
        .then( result => {
          if (result.code === 200) {
            this.objectivesList = result.objectives
            return true
          } else {
            return false
          }
        })
    }
  }
})