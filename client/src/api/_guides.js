import { api } from "boot/axios"

export default {
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
