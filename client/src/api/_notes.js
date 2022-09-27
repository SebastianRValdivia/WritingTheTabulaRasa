import { api } from "boot/axios"

export default {
  getNotesList() {
    return api.get("v1/notes/permanent/")
      .then(response => { return {
          code: response.status,
          notes: response.data
        }
      })
      .catch(response => { return {
        code: response.status
      }})
  },
  patchNoteContent(idNoteToPatch, newNoteContent) {
    return api.patch(
      `v1/notes/permanent/${idNoteToPatch}/`,
      { content: newNoteContent.value }
      )
      .then(response => { return {
          code: response.status,
        }
      })
      .catch(response => { return {
        code: response.status
      }})
  },
  getFleetingNotesList() {
    return api.get("v1/notes/fleeting/")
      .then(response => { return {
          code: response.status,
          fleetingNotes: response.data
        }
      })
      .catch(response => { return {
        code: response.status
      }})
  }
}