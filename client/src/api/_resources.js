import { api } from "boot/axios"
import { recursiveGetCall } from "src/utils/api"

export default {
  async getLearningResources() {
    let result = await recursiveGetCall("v1/resources/learning/")

    if (result.code === 200) {
      return {
        code: result.code,
        learningResourcesList: result.data
      }
    } else return false
  },
  async postLearningResource(learningResourceData) {
    try {
      let response = await api.post(
        "v1/resources/learning/",
        learningResourceData
      )

      if (response.status === 201) {
        return {
          code: response.status,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async deleteLearningResource(resourceId) {
    try {
      let response = await api.delete(`v1/resources/learning/${resourceId}`)

      if (response.status === 204) {
        return true
      }
    } catch {
      return false 
    }
  },
  async getImageResources(url=null, previous=[]) {
    let result = await recursiveGetCall("v1/resources/images/")

    if (result.data) {
      return result
    } else return false
  },
  async getImageResourceById(imgId) {
    try {
      let response = await api.get(`v1/resources/images/${imgId}`)

      if (response.status === 200) {
        return {
          code: 200,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async postImageResource(imageData) {
    let formData = new FormData()
    formData.append("file", imageData.file)
    formData.append("caption", imageData.caption)

    try {
      let response = await api.post(
        "v1/resources/images/",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )

      if (response.status === 201) return {data: response.data}
      else return false
    } catch {
      return false
    }
  }
}
