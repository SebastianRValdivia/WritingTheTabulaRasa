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
  },
  async getResearchesProcess(url=null, previous=[]) {
    try {
      let response = url === null 
        ? await api.get("v1/researches/process/") 
        : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: response.status,
          researchesProcessList: data
        }
      } else if ( response.data.next !== null) {
        return this.getResearchesProcess(url=response.data.next, previous=data)
      } else return false
    } catch {
      return false 
    }
  }
}
