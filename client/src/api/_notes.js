import { api } from "boot/axios"

export default {
  getNotesList() {
    return api.get("v1/notes")
      .then(response => { return {
          code: response.status,
          notes: response.data
        }
      })
      .catch(response => { return {
        code: response.status
      }})
  }
}