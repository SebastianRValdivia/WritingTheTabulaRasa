import { defineStore } from "pinia"
import api from "src/api"

export const useMetadataStore = defineStore("metadata", {
  state: () => ({
    metadataObjectsList: [],
    categoriesList: []
  }),
  getters: {},
  actions: {
    async createMetadataObject(metadataObject) {
      let result = await api.metadata.postMetadataObject(metadataObject)

      if (result) {
        this.metadataObjectsList.push(result.data)
        return result.data
      } else return false
    }
  }
})
