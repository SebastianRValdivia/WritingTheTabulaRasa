import { defineStore } from "pinia"
import api from "src/api"

export const useGuideStore = defineStore("guides", {
  state: () => ({
    guidesList: [],
    stepsList: [],
  }),
  getters: {
    getGuidesList: (state) => state.guidesList,
  },
  actions: {
    async retrieveGuides() {
      let result = await api.guides.getGuides()

      if (result) {
        this.guidesList = result.guidesList
        return true
      } else return false
    }
  }
})
