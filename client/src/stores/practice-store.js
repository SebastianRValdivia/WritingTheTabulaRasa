import { defineStore } from "pinia"
import api from "src/api"
import { useUserStore } from "src/stores/user-store"

export const usePracticeStore = defineStore("note", {
  state: () => ({
    practicesList: [],
  }),
  getters: {},
  actions: {
    async createPracticeRoutine(routineData) {
      const userStore = useUserStore()
      routineData = { ...routineData, ...{owner: userStore.getUserId}}
      let result = await api.practice.postPracticeRoutine(routineData)

      if (result) {
        practicesList.push(result.data)
        return result.data
      } else return false
    }
  }
})
