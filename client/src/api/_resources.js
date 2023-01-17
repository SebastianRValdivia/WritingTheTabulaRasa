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
  async getImageResources(url=null, previous=[]) {
    try {
      let response = url === null 
        ? await api.get("v1/resources/images/") 
        : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: response.status,
          imageResourcesList: data
        } 
      } else if (response.data.next !== null) {
        return this.getImageResources(response.data.next, data)
      } else return false
    } catch {
      return false
    }

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

    let response = await api.post(
      "v1/resources/images/",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    )

    if (response.status = 201) {
      return {
        code: response.status,
        imageUrl: response.data.file,
      }
    } else {
      return false
    }
  }
}
