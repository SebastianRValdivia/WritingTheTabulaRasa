import { defineStore } from "pinia"
import api from "src/api";

import { useUserStore } from "src/stores/user-store"

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    goalsList: [],
    objectivesList: []
  }),
  getters: {
    getGoalsList: (state) => state.goalsList,
    getObjectivesList: (state) => state.objectivesList,
    getGoalById: (state) => {
      return (goalId) => state.goalsList.find((goal) => goal.id === goalId)
    }
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
    async retrieveGoalById(goalId){
      let result = await api.schedule.getGoalById(goalId)

      if (result && !this.getGoalById(goalId)) {
        this.goalsList.push(result.goal)
        return true
      } else return false
    },
    async createGoal(goalData) {
      let userStore = useUserStore()
      goalData.owner = userStore.getUserId
      let result = await api.schedule.postGoal(goalData)

      if (result) {
        this.goalsList.push(result.newGoal)
        return true
      } else return result
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
