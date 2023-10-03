import { defineStore } from "pinia"
import api from "src/api"


export const useResearchStore = defineStore("research", {
  state: () => ({
    researchProcessList: []
  }),
  getters: {
    getResearchesProcessList: (state) => state.researchProcessList,
    getResearchProcessById: (state) => {
      return (id) => state.researchProcessList.find(
        (researchProcess) => researchProcess.id === id
      )
    },
  },
  actions: {
    async retrieveResearchProcessById(id) {
      let result = await api.research.getResearchProcessById(id)

      if (result) {
        this.researchProcessList.push(result.researchProcess)
        return true
      } else return false
    },
    async retrieveResearchesProcess() {
      let result = await api.research.getResearchesProcess()

      if (result) {
        this.researchProcessList = result.researchesProcessList
        return true
      } else return false
    }
  }
})
