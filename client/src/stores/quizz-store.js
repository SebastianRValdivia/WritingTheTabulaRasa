import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
    formulationQuestionsList: []
  }),
  getters: {
    getQuizzesList: (state) => state.quizzesList,
    getQuestionsByQuizzId: (state) => {
      return (quizzId) => {
        let formulationQuestions = state.formulationQuestionsList.filter(
          (question) => question.quizz === quizzId
        ) 
        return [
          ...formulationQuestions,
        ]
      }
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
    async retrieveQuizzesFormulationQuestionsList() {
      let result = await api.quizzes.getQuizzesFormulationQuestions()

      if (result) {
        this.formulationQuestionsList = result.quizzesFormulationQuestionsList
        return true
      } else return false
    },
    async retrieveQuizzesQuestionsList() {
      await this.retrieveQuizzesFormulationQuestionsList()
    }
  }
})
