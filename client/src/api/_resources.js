import { api } from "boot/axios";

export default {
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
