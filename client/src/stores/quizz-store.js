import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
    questionsList: []
  }),
  getters: {
    getQuizzesList: (state) => state.quizzesList,
    getQuestionsByQuizzId: (state) => {
      return (quizzId) => 
        state.questionsList.filter((question) => question.quizz === quizzId) 
    }
  },
  actions: {
    async retrieveQuizzesList() {
      let result = await api.quizzes.getQuizzesObjects()

      if (result) {
        this.quizzesList = result.quizzesList
        return true
      } else return false
    },
    async retrieveQuizzesQuestionsList() {
      let result = await api.quizzes.getQuizzesQuestions()

      if (result) {
        this.questionsList = result.quizzesQuestionsList
        return true
      } else return false
    }
  }
})
