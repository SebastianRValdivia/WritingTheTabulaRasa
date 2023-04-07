import { defineStore } from "pinia"
import api from "src/api"
import { useUserStore } from "src/stores/user-store"

export const usePracticeStore = defineStore("practice", {
  state: () => ({
    practiceRoutinesList: [],
    assignedPracticeRoutinesList: [],
  }),
  getters: {
    getAssignedPracticeRoutinesByUser: (state) => {
      return (userId) => state.assignedPracticeRoutinesList.filter(
        (assignedRoutine) => assignedRoutine.owner === userId
      )
    },
    getPracticeRoutineById: (state) => {
      return (practiceRoutineId) => state.practiceRoutinesList.find(
        (practiceRoutine) => practiceRoutine.id === practiceRoutineId
      )
    },
  },
  actions: {
    async createPracticeRoutine(routineData) {
      const userStore = useUserStore()
      routineData = { ...routineData, ...{owner: userStore.getUserId}}
      let result = await api.practice.postPracticeRoutine(routineData)

      if (result) {
        this.practiceRoutinesList.push(result.data)
        return result.data
      } else return false
    },
    async retrievePracticeRoutines() {
      let result = await api.practice.getPracticeRoutinesList()

      if (result) {
        this.practiceRoutinesList = result.data
        return true
      } else return false
    },
    async retrievePracticeRoutine(routineId) {
      let result = await api.practice.getPracticeRoutineById(routineId)

      if (result) {
        this.practiceRoutinesList.push(result.data) 
        return true
      } else return false
    },
    async retrieveAssignedPracticeRoutines() {
      let result = await api.practice.getAssignedPracticeRoutines()

      if (result) {
        this.assignedPracticeRoutinesList = result.data
        return true
      } else return false
    }
  }
})
