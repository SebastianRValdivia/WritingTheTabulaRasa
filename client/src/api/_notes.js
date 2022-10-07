import { api } from "boot/axios"

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
    let response = await api.post(
      "v1/notes/permanent/",
      { content: newNoteContent }
    )
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
  async postFleetingNote(content, ownerId) {
    let response = await api.post(
      "v1/notes/fleeting/",
      {
        content: content,
        owner: ownerId
      }
    )

    return {
        code: response.status,
        newFleetingNote: response.data
    }
  }
}