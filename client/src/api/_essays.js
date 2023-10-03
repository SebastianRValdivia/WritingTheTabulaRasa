import { api } from "boot/axios"

export default {
  async getEssays(url=null, previous=[]) {
    try {
      let response = url === null 
        ? await api.get("v1/essays/") 
        : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: 200,
          essaysList: data
        }
      } else if ( response.data.next !== null) {
        return this.getEssays(url=response.data.next, previous=data)
      } else return false
    } catch {
      return false 
    }
  },
  async getEssayByUrl(essayUrl) {
    try {
      let response = await api.get(`v1/essays/?url=${essayUrl}`)

      if (response.status === 200) {
        return {
          code: 200,
          essay: response.data.results[0]
        }
      } else return false
    } catch {
      return false 
    }
  },
  async postEssay(essayData) {
    try {
      let response = await api.post("v1/essays/", essayData)
      if (response.status === 201) {
        return {
          code: 201,
          essay: response.data
        }
      } else return false
    } catch {
      return false
    }
  }
}
