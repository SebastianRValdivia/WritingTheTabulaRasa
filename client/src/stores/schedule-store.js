const { defineStore } = require("pinia");
import api from "src/api";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    goalsList: []
  }),
  getters: {
    getGoalsList: (state) => state.goalsList,
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
      
    }
  }
})