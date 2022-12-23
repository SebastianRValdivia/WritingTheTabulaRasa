import { defineStore } from "pinia"
import api from "src/api"

export const useResourceStore = defineStore("resource", {
  state: () => ({
    imagesResourcesList: []
  }),
  getters: {
    getImageResourceById: (state) => {
      return (imgId) => state.imagesResourcesList.find(
        (img) => img.id === imgId
      )
    }
  },
  actions: {
    async retrieveImageResources() {
      let result = await api.resources.getImageResources()

      if (result) this.imagesResourcesList = result.imageResourcesList
    }
  }
})
