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
    },
    async saveGuide(guideData) {
      let result = await api.guides.postGuide(guideData)

      if (result) {
        this.guidesList.push(result.newGuide)
        return result.newGuide
      } else return false
    },
    async saveStep(stepData) {
      let result = await api.guides.postStep(stepData)

      if (result) {
        this.stepsList.push(result.newStep)
        return true
      } else return false
    }
  }
})
