import { defineStore } from "pinia"
import api from "src/api";

import { useUserStore } from "src/stores/user-store"

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    goalsList: [],
    objectivesList: [],
    userTimeTablesList: [], // Only logged user tables
    userHoursList: [], // Only logged user hours
  }),
  getters: {
    getGoalsList: (state) => state.goalsList,
    getGoalsListByUser: (state) => {
      return (userId) => state.goalsList.filter((goal) => goal.owner === userId)
    },
    getObjectivesList: (state) => state.objectivesList,
    getGoalById: (state) => {
      return (goalId) => state.goalsList.find((goal) => goal.id === goalId)
    },
    getUserActiveTimeTable: (state) => {
      return state.userTimeTablesList.find( (table) => table.status === true)
    },
    getUserHours: (state) => state.userHoursList,
    getUserHoursByTable: (state) => {
      return (tableId) => state.userHoursList.filter( 
        (hour) => hour.table == tableId
      )
    },
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
      } else return false
    },
    async retrieveUserTimeTables() {
      let userStore = useUserStore()
      let result = await api.schedule.getTimeTablesByUser(userStore.getUserId)
      if (result.code === 200) {
        this.userTimeTablesList = result.data
        return true
      } else return false
    },
    async retrieveUserHours() {
      let userStore = useUserStore()
      let result = await api.schedule.getHoursByUser(userStore.getUserId)
      if (result.code === 200) {
        this.userHoursList = result.data
        return true
      } else return false
    },
  }
})
