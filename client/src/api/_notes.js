import { api } from "boot/axios"
import { recursiveGetCall } from "src/utils/api"

export default {
  async getNotesList(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/notes/permanent/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        notes: data
      } 
    } else if (response.data.next !== null) {
        return this.getNotesList(response.data.next, data)
    } else {
      return {
        code: response.status,
      }
    }
  },
  async getNoteById(noteId){
    let response = await api.get(`v1/notes/permanent/${noteId}/`)

    if (response.status === 200) {
      return {
        code: response.status,
        note: response.data
      }
    } else {
      return {
        code: response.status
      }
    }

  },
  async patchNoteContent(idNoteToPatch, newNoteContent) {
    let response = await api.patch(
      `v1/notes/permanent/${idNoteToPatch}/`,
      { content: newNoteContent.value }
    )

    return {
      code: response.status
    }
  },
  async postNote(newNoteContent) {
    try {
      let response = await api.post(
        "v1/notes/permanent/",
        newNoteContent,
      )

      if (response.status === 201) {
        return {
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async deleteNote(noteId) {
    let response = await api.delete(`v1/notes/permanent/${noteId}/`)
    
    return {
      code: response.status
    }
  },
  async getFleetingNotesList(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/notes/fleeting/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        fleetingNotes: data
      } 
    } else {
        return this.getFleetingNotesList(response.data.next, data)
    }
  },
  async postFleetingNote(noteData) {
    let response = await api.post(
      "v1/notes/fleeting/",
      noteData,
    )

    return {
        code: response.status,
        data: response.data
    }
  },
  async deleteFleetingNote(noteId) {
    try {
      let response = await api.delete(`v1/notes/fleeting/${noteId}/`)
      
      if (response.status === 204) return true
      else return false
    } catch {
      return false
    }
  },
  async patchFleetingNoteContent(idNoteToPatch, newNoteContent) {
    try {
      let response = await api.patch(
        `v1/notes/fleeting/${idNoteToPatch}/`,
        { content: newNoteContent }
      )

      if (response.status === 200) {
        return {
          code: response.status,
          updatedFleetingNote: response.data
        }
      } else return false
    } catch {
      return false
    }

  },
  async getLiteraryNotesList(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/notes/literary/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        literaryNotes: data
      } 
    } else {
        return this.getLiteraryNotesList(response.data.next, data)
    }
  },
  async postLitearyNote(data) {
    try {
      let response = await api.post("v1/notes/literary/", data)

      if (response.status === 201) {
        return response.data
      } else return false
    } catch {
      return false
    }
  },
  async patchLiteraryNote(idNoteToPatch, newNoteData) {
    try {
      let response = await api.patch(
        `v1/notes/literary/${idNoteToPatch}/`,
        newNoteData
      )

      if (response.status === 200) {
        return {
          code: response.status,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
  async deleteLiteraryNote(noteId) {
    try {
      let response = await api.delete(`v1/notes/literary/${noteId}/`)
      
      if (response.status === 204) return true
    } catch {
      return false
    }
  },
  async getNoteConnectionsByUser(userId) {
    let result = await recursiveGetCall(`v1/notes/connections/?owner=${userId}`)

    if (result.code === 200) return result
    else return false
  }
}
