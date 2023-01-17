import { defineStore } from "pinia"
import api from "src/api"

export const useResourceStore = defineStore("resource", {
  state: () => ({
    learningResourcesList: [],
    imagesResourcesList: [],
  }),
  getters: {
    getLearningResourcesByUser: (state) => {
      return (userId) => state.learningResourcesList.find(
        (resource) => resource.owner === userId
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
    async retrieveImageResources() {
      let result = await api.resources.getImageResources()

      if (result) this.imagesResourcesList = result.imageResourcesList
    }
  }
})
