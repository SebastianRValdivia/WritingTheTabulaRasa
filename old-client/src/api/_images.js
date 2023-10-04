import { api } from "boot/axios"
import { recursiveGetCall } from "src/utils/api"

export default {
  async getImages(url=null, previous=[]) {
    let result = await recursiveGetCall("v1/images/")

    if (result.data) {
      return result
    } else return false
  },
  async getImageResourceById(imgId) {
    try {
      let response = await api.get(`v1/images/${imgId}`)

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
        "v1/images/",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )

      if (response.status === 201) return {
        code: 201,
        data: response.data
      }
      else return false
    } catch {
      return false
    }
  }
}
