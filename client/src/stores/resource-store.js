import { defineStore } from "pinia"
import api from "src/api"

export const useResourceStore = defineStore("resource", {
  state: () => ({
    learningResourcesList: [],
    imagesResourcesList: [],
  }),
  getters: {
    getLearningResources: (state) => state.learningResourcesList,
    getLearningResourcesByUser: (state) => {
      return (userId) => state.learningResourcesList.filter(
        (resource) => resource.owner === userId
      )
    },
    getLearningResourceById: (state) => {
      return (resourceId) => state.learningResourcesList.find(
        (resource) => resource.id === resourceId
      )
    },
    getImageResourceById: (state) => {
      return (imgId) => state.imagesResourcesList.find(
        (img) => img.id === imgId
      )
    },
  },
  actions: {
    async retrieveLearningResources() {
      let result = await api.resources.getLearningResources()

      if (result) {
        this.learningResourcesList = result.learningResourcesList
        return true
      } else return false
    },
    async saveLearningResource(learningResourceData) {
      let result = await api.resources.postLearningResource(
        learningResourceData
      )

      if (result) {
        this.learningResourcesList.push(result.newLearningResource)
        return true
      } else return false
    },
    async removeLearningResourceById(resourceId) {
      let result = await api.resources.deleteLearningResource(
        resourceId
      )

      if (result) {
        this.learningResourcesList = this.learningResourcesList.filter(
          (resource) => resource.id !== resourceId
        )
        return true
      } else return false
    },
    async retrieveImageResources() {
      let result = await api.resources.getImageResources()

      if (result) this.imagesResourcesList = result.imageResourcesList
    }
  }
})
