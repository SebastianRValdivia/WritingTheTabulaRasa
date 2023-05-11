import { defineStore } from "pinia"
import api from "src/api"

export const useQuizzStore = defineStore("quizz", {
  state: () => ({
    quizzesList: [],
    quizzesQuestionsList: [], // All questions from all quizzes
    formulationResponsesList: [],
    choicesList: [],
    flashCardCollectionList: [],
    flashCardList: [],
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
    getchoicesbyquestionid: (state) => {
      return (questionid) => state.choiceslist.filter(
        (choice) => choice.question === questionid
      )
    },
    getFlashCardCollectionList: (state) => state.flashCardCollectionList,
    getFlashCardsByCollectionId: (state) => {
      return (collectionId) => state.flashCardList.filter(
        (flashcard) => flashcard.collection === collectionId
      )
    },
  },
  actions: {
    async createQuizzObject(quizzData) {
      let result = await api.quizzes.postQuizzObject(quizzData)

      if (result) {
        this.quizzesList.push(result.data)
        return result.data
      } else return false
    },
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
    async createQuizzQuestion(questionData) {
      let result = await api.quizzes.postQuizzQuestion(questionData)

      if (result) {
        this.quizzesQuestionsList.push(result.data)
        return result.data
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
    async createFormulationQuestion(formulationQuestionData) {
      let result = await api.quizzes.postQuizzFormulationQuestion(
        formulationQuestionData
      )

      if (result) {
        this.formulationResponsesList.push(result.data)
        return result.data
      } else return false

    },
    async retrieveChoicesByQuestionId(questionId) {
      let result = await api.quizzes.getChoicesByQuestionId(questionId)

      // TODO: check if choice already exist
      if (result) {
        this.choicesList = [...result.choicesList, ...this.choicesList]
        return true
      } else return false
    },
    async retrieveFlashCardCollections() {
      let result = await api.quizzes.getFlashCardCollections()

      if (result) {
        this.flashCardCollectionList = result.data
        return true
      } else return false
    },
    async retrieveFlashCards() {
      let result = await api.quizzes.getFlashCards()

      if (result) {
        this.flashCardList = result.data
        return true
      } else return false
    },
    async retrieveFlashCardsByCollectionId(collectionId) {
      let result = await api.quizzes.getFlashCardsByCollectionId(collectionId)

      if (result) {
        this.flashCardList = [...this.flashCardList, ...result.data]
        return true
      } else return false
    },
    async createFlashCardCollection(collectionData) {
      let result = await api.quizzes.postFlashCardCollection(collectionData)

      if (result) {
        this.flashCardCollectionList.push(result.data)
        return result.data.id
      } else return false
    },
    async createFlashCard(flashCardData) {
      let result = await api.quizzes.postFlashCard(flashCardData)

      if (result) {
        this.flashCardList.push(result.data)
        return true
      } else return false
    },
    async removeFlashCardCollection(collectionId) {
      let result = await api.quizzes.deleteFlashCardCollection(collectionId)

      if (result) {
        let indexCollectionToDelete = this.flashCardCollectionList.findIndex(
          (collection) => collection.id === collectionId
        )
        this.flashCardCollectionList.splice(indexCollectionToDelete, 1)
        // TODO: remove flashcards too
        return true
      } else return false
    }
  }
})
