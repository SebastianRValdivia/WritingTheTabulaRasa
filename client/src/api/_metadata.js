import { api } from "boot/axios"

export default {
  async postMetadataObject(payload) {
    try {
      let response = await api.post(
        "v1/metadata/metadata-objects/",
        payload
      )

      if (response.data && response.status === 201) {
        return {
          newMetadataObject: response.data
        }
      }
    } catch {
      return false
    }
  }

}
