import { defineStore } from "pinia"
import api from "src/api"
import { useUserStore } from "src/stores/user-store"

export const usePracticeStore = defineStore("practice", {
  state: () => ({
    practiceRoutinesList: [],
  }),
  getters: {},
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
      } else return false
    }
  }
})
