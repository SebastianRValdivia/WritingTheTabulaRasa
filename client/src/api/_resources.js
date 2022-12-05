import { api } from "boot/axios";

export default {
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
        code: responsen.status,
        imageUrl: response.data.file,
      }
    } else {
      return false
    }
  }
}
