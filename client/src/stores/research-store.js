import { defineStore } from "pinia"
import api from "src/api";


export const useResearchStore = defineStore("research", {
  state: () => ({
    researchProcessList: []
  }),
  getters: {
    getResearchProcessById: (state) => {
      return (id) => state.researchProcessList.find(
        (researchProcess) => researchProcess.id === id
      )
    }
  },
  actions: {
    async retrieveResearchProcessById(id) {
      let result = await api.research.getResearchProcessById(id)

      if (result) this.researchProcessList.push(result.researchProcess)
      return true
    }


  }
})
