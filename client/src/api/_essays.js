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
}
