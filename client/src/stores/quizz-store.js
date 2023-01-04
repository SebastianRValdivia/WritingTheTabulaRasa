import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
    formulationQuestionsList: [],
    choicesQuestionList: [],
  }),
  getters: {
    getQuizzesList: (state) => state.quizzesList,
    getQuizzDataById: (state) => {
      return (quizzId) => state.quizzesList.find(
        (quizz) => quizz.id === quizzId
      )
    },
    getQuestionsByQuizzId: (state) => {
      return (quizzId) => {
        let formulationQuestions = state.formulationQuestionsList.filter(
          (question) => question.quizz === quizzId
        ) 
        let choicesQuestions = state.choicesQuestionList.filter(
          (question) => question.quizz === quizzId
        ) 
        return [
          ...formulationQuestions,
          ...choicesQuestions,
        ]
      }
    },
  },
  actions: {
    async retrieveQuizzesList() {
      let result = await api.quizzes.getQuizzesObjects()

      if (result) {
        this.quizzesList = result.quizzesList
        return true
      } else return false
    },
    async retrieveQuizzById(quizzId) {
      let result = await api.quizzes.getQuizzObjectById(quizzId)

      // TODO: check if already exist with getter
      if (result) {
        this.quizzesList.push(result.quizzData)
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
    async retrieveQuizzesChoicesQuestionsList() {
      let result = await api.quizzes.getQuizzesChoicesQuestions()

      if (result) {
        this.choicesQuestionList = result.choicesQuestionsList
        return true
      } else return false
    },
    async retrieveQuizzesQuestionsList() {
      await this.retrieveQuizzesFormulationQuestionsList()
      await this.retrieveQuizzesChoicesQuestionsList()
    }
  }
})
