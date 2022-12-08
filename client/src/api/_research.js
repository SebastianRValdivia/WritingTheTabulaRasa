import { api } from "boot/axios"

export default {
  async getResearchProcessById(id) {
    try {
      let respose = await api.get(`v1/researches/process/${id}`)

      if (respose.status === 200) {
        return {
          code: respose.status,
          researchProcess: respose.data
        }
      } else {
        console.error(respose)
        return false
      }
    } catch {
      return false
    }
  }
}
