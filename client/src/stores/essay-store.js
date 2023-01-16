import { defineStore } from "pinia"
import api from "src/api"

export const useEssayStore = defineStore("essays", {
  state: () => ({
    essaysList: [],
  }),
  getters: {
    getEssays: (state) => state.essaysList,
    getEssayByUrl: (state) => {
      return (essayUrl) => state.essaysList.find(
        (essay) => essay.url === essayUrl
      )
    },
  },
  actions: {
    async retrieveEssays() {
      let result = await api.essays.getEssays()

      if (result) {
        this.essaysList = result.essaysList
        return true
      } else return false
    },
    async retrieveEssayByUrl(essayUrl) {
      let result = await api.essays.getEssayByUrl(essayUrl)

      if (result && !this.getEssayByUrl(essayUrl)) {
        this.essaysList.push(result.essay)
        return true
      } else return false
    },
    async saveEssay(essayData) {
      let result = await api.essays.postEssay(essayData)

      if (result) {
        this.essaysList.push(result.essay)
        return true
      } else return false
    }
  }
})
