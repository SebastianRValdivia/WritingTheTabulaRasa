import { defineStore } from "pinia"
import api from "src/api"

export const useEssayStore = defineStore("essays", {
  state: () => ({
    essaysList: [],
  }),
  getters: {
    getEssays: state => state.essaysList
  },
  actions: {
    async retrieveEssays() {
      let result = await api.essays.getEssays()

      if (result) {
        this.essaysList = result.essaysList
        return true
      } else return false
    }
  }
})
