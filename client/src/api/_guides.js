import { api } from "boot/axios"

export default {
  async getGuides(url=null, previous=[]) {
    try {
      let response = url === null 
        ? await api.get("v1/guides/guides/") 
        : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: response.status,
          guidesList: data
        }
      } else if ( response.data.next !== null) {
        return this.getGuides(url=response.data.next, previous=data)
      } else return false
    } catch {
      return false 
    }
  },
  async getGuideByUrl(url) {
    try {
      let response = await api.get(`v1/guides/guides/?url=${url}`)

      if (response.data.results.length === 1 ) {
        return {
          code: response.status,
          guide: response.data.results[0]
        }
      } else return false
    } catch {
      return false
    }
  },
  async getStepsByGuideId(guideId) {
    try {
      let response = await api.get(`v1/guides/steps/?guide=${guideId}`)
      
      if (response.data.results.length >= 1 ) {
        return {
          code: response.status,
          steps: response.data.results
        }
      } else return false

    } catch {
      return false
    }

  }
}
