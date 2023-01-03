import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
  }),
  getters: {
    getQuizzesList: (state) => state.quizzesList,
  },
  actions: {
    async retrieveQuizzesList() {
      let result = await api.quizzes.getQuizzesObjects()

      if (result) {
        this.quizzesList = result.quizzesList
        return true
      } else return false
    },
  }
})
