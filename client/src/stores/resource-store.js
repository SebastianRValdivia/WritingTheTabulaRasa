import { defineStore } from "pinia"
import api from "src/api"
import { useUserStore } from "src/stores/user-store"

export const useResourceStore = defineStore("resource", {
  state: () => ({
    learningResourcesList: [],
    // List of ids of user assigned learning res
    userLearningResourceIdsList: [],
    imagesResourcesList: [],
  }),
  getters: {
    getLearningResources: (state) => state.learningResourcesList,
    getLearningResourceById: (state) => {
      return (resourceId) => state.learningResourcesList.find(
        (resource) => resource.id === resourceId
      )
    },
    getUserAssignedLearningResources: (state) =>
      state.userLearningResourceIdsList,
  },
  actions: {
    async retrieveLearningResources() {
      let result = await api.resources.getLearningResources()

      if (result) {
        this.learningResourcesList = result.learningResourcesList
        return true
      } else return false
    },
    async retrieveUserAssignedLearningResources() {
      const userStore = useUserStore()
      let result = await api.resources.getUserAssignedLearningResources(
        userStore.getUserId
      )
      if (result) {
        this.userLearningResourceIdsList = result.data
        return true
      } else return false
    },
    async createLearningResource(learningResourceData) {
      let result = await api.resources.postLearningResource(
        learningResourceData
      )

      if (result) {
        this.learningResourcesList.push(result.data)
        return result.data
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
  }
})
