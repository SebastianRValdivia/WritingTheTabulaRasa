import { api } from "boot/axios"

import { recursiveGetCall } from "src/utils/api"

export default {
  async getQuizzesObjects(url=null, previous=[]) {
    let result = await recursiveGetCall("v1/quizzes/quizzes-objects/")
    if (result) {
      return {
        code: result.code,
        quizzesList: result.data
      }
    } else return false
  },
  async postQuizzObject(payload) {
    try {
      let result = await api.post(
        "v1/quizzes/quizzes-objects/",
        payload,
      )

      if (result.status === 201) {
        return {
          code: result.code,
          data: result.data
        }
      }
    } catch {
      return false
    }
  },
  async getQuizzObjectById(quizzId) {
    try {
      let response = await api.get(`v1/quizzes/quizzes-objects/${quizzId}/`)

      if (response.status === 200) {
        return {
          code: response.status,
          quizzData: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async getQuizzesQuestions() {
    let result = await recursiveGetCall("v1/quizzes/quizz-questions/")
    if (result) {
      return {
        code: result.code,
        quizzesQuestionsList: result.data
      }
    } else return false
  },
  async postQuizzQuestion(payload) {
    try {
      let result = await api.post(
        "v1/quizzes/quizz-questions/",
        payload,
      )

      if (result.status === 201) {
        return {
          code: result.code,
          data: result.data
        }
      }
    } catch {
      return false
    }
  },
  async getFormulationResponseByQuestionId(questionId) {
    try {
      let response = await api.get(
        `v1/quizzes/question-formulations/?question=${questionId}`
      )

      if (response.status === 200) {
        return {
          code: 200,
          formulationReponse: response.data.results[0]
        }
      } else return false
    } catch {
      return false 
    }
  }, 
  async getChoicesByQuestionId(questionId) {
    try {
      let response = await api.get(
        `v1/quizzes/question-choices/?question=${questionId}`
      )

      if (response.status === 200) {
        return {
          code: 200,
          choicesList: response.data.results,
        }
      } else return false
    } catch {
      return false
    }
  },
  async getFlashCardCollections() {
    let result = await recursiveGetCall("v1/quizzes/flashcard-collections/")
    if (result) {
      return {
        code: result.code,
        data: result.data
      }
    } else return false
  },
  async getFlashCards() {
    let result = await recursiveGetCall("v1/quizzes/flashcards/")
    if (result) {
      return {
        code: result.code,
        data: result.data
      }
    } else return false
  },
  async getFlashCardsByCollectionId(collectionId) {
    let result = await recursiveGetCall(`v1/quizzes/flashcards/?collection=${collectionId}`)
    if (result) {
      return {
        code: result.code,
        data: result.data
      }
    } else return false
  },
  async postFlashCardCollection(collectionData) {
    let response = await api.post(
      "v1/quizzes/flashcard-collections/",
      collectionData
    )

    if (response) {
      return {
        code: response.code,
        data: response.data
      }
    } else return false
  },
  async postFlashCard(flashCardData) {
    try {
      let response = await api.post(
        "v1/quizzes/flashcards/",
        flashCardData
      )

      if (response) {
        return {
          code: response.code,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async deleteFlashCardCollection(collectionId) {
    try {
      let response = await api.delete(
        `v1/quizzes/flashcard-collections/${collectionId}/`
      )

      if (response) return true
      else return false
    } catch {
      return false
    }
  },
  async postFlashCardTestResult(resultsData) {
    try {
      let response = await api.post(
        "v1/quizzes/flashcard-results/",
        resultsData
      )

      if (response) {
        return {
          code: response.code,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
}
