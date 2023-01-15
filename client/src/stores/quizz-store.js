import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
    quizzesQuestionsList: [],
    formulationResponsesList: [],
    choicesList: [],
  }),
  getters: {
    getQuizzesList: (state) => state.quizzesList,
    getQuizzDataById: (state) => {
      return (quizzId) => state.quizzesList.find(
        (quizz) => quizz.id === quizzId
      )
    },
    getQuestionsByQuizzId: (state) => {
      return (quizzId) => state.quizzesQuestionsList.filter(
        (question) => question.quizz === quizzId
      )
    },
    getFormulationResponseByQuestionId: (state) => {
      return (questionId) => state.formulationResponsesList.find(
        (response) => response.question === questionId
      )
    },
    getChoicesByQuestionId: (state) => {
      return (questionId) => state.choicesList.filter(
        (choice) => choice.question === questionId
      )
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
    async retrieveQuizzById(quizzId) {
      let result = await api.quizzes.getQuizzObjectById(quizzId)

      // TODO: check if already exist with getter
      if (result) {
        this.quizzesList.push(result.quizzData)
        return true
      } else return false
    },
    async retrieveQuizzesQuestionsList() {
      let result = await api.quizzes.getQuizzesQuestions()

      if (result) {
        this.quizzesQuestionsList = result.quizzesQuestionsList
        return true
      } else return false
    },
    async retrieveFormulationResponseByQuestionId(questionId) {
      let result = await api.quizzes.getFormulationResponseByQuestionId(
        questionId
      )
      if (result) {
        this.formulationResponsesList.push(result.formulationReponse)
        return true
      } else return false
    },
    async retrieveChoicesByQuestionId(questionId) {
      let result = await api.quizzes.getChoicesByQuestionId(questionId)

      // TODO: check if choice already exist
      if (result) {
        this.choicesList = [...result.choicesList, ...this.choicesList]
        return true
      } else return false
    }
  }
})
