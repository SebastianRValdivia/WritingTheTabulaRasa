import { defineStore } from "pinia"
import api from "src/api"
import { useUserStore } from "src/stores/user-store"

export const usePracticeStore = defineStore("practice", {
  state: () => ({
    practiceRoutinesList: [],
    assignedPracticeRoutinesList: [],
    // TODO: Refactor to use list
    practiceRoutineUserCompletions: [], // Only logged user
    practiceExercisesList: [],
  }),
  getters: {
    getAssignedPracticeRoutinesByUser: (state) => {
      return (userId) => state.assignedPracticeRoutinesList.filter(
        (assignedRoutine) => assignedRoutine.owner === userId
      )
    },
    getPracticeRoutines: (state) => state.practiceRoutinesList,
    getPracticeRoutineById: (state) => {
      return (practiceRoutineId) => state.practiceRoutinesList.find(
        (practiceRoutine) => practiceRoutine.id === practiceRoutineId
      )
    },
    getUserPracticeRoutineCompletionsByRoutineId: (state) => {
      return (practiceRoutineId) => state.practiceRoutineUserCompletions.filter(
        (completion) => completion.routine === practiceRoutineId
      )
    },
    getPracticeExercisesByRoutine: (state) => {
      return (practiceRoutineId) => state.practiceExercisesList.filter(
        (exercise) => exercise.routine === practiceRoutineId
      )
    }
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
    },
    async retrieveUserCompletedPracticeRoutines() {
      const userStore = useUserStore()

      let result = await api.practice.getCompletedPracticeRoutinesByUser(
        userStore.getUserId
      )

      if (result) {
        this.practiceRoutineUserCompletions = result.data
        return true
      } else return false
    },
    async retrievePracticeExercisesByRoutine(routineId) {
      let result = await api.practice.getPracticeExercisesByRoutine(routineId)

      if (result.data.length > 0) {
        // TODO: check if there arent already on the store
        this.practiceExercisesList = [...this.practiceExercisesList, ...result.data]
        return true
      } else return false
    },
    async createPracticeRoutineCompletion(routineId) {
      const userStore = useUserStore()
      let data = {
        routine: routineId,
        owner: userStore.getUserId
      }
      let result = await api.practice.postCompletedPracticeRoutine(data)

      if (result) {
        this.practiceRoutineUserCompletions.push(result.data)
        return true
      } else return false
    },
    async createAssignedPracticeRoutineToUser(routineId) {
      const userStore = useUserStore()
      let data = {
        routine: routineId,
        owner: userStore.getUserId
      }
      let result = await api.practice.postAssignPracticeRoutine(data)

      if (result) {
        this.assignedPracticeRoutinesList.push(result.data)
        return true
      } else return false
    }
  }
})
