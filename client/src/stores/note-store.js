import { defineStore } from "pinia"
import api from "src/api"
import { filterNoteFamily, constructNoteTree } from "src/utils/notes"
import { useUserStore } from "src/stores/user-store"

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    fleetingNotes: [],
    literaryNotes: []
  }),
  getters: {
    getNotesList: (state) => state.notes,
    getNoteById: (state) => {
      return (noteId) => state.notes.find((note) => note.id === noteId)
    },
    // Find note parent till there is only one note
    getNoteByIdentifier: (state) => {
      return (noteIdentifierList) => (
        filterNoteFamily(state.notes, noteIdentifierList).at(-1)
      )
    },
    getNotesByUser: (state) => {
      return (userId) => state.notes.filter((note) => note.owner === userId)
    },
    getFleetingNotesByUser: (state) => {
      return (userId) => state.fleetingNotes.filter((note) => note.owner === userId)
    },
    getNotesByParent: (state) => {
      return (parentId) => state.notes
        .filter((note) => note.parent === parentId)
    },
    getRootNotes: (state) => (state.notes.filter((note) => note.parent === null)),
    getNotesInTreeFormat: (state) => constructNoteTree(state.notes),

    getFleetingNotes: (state) => state.fleetingNotes,
    getLiteraryNotes: (state) => state.literaryNotes,
    getLiteraryNotesByUser: (state) => {
      return (userId) => state.literaryNotes.filter((note) => note.owner === userId)
    },
    getLiteraryNoteById: (state) => {
      return (noteId) => state.literaryNotes.find((note) => note.id === noteId)
    },
  },
  actions: {
    async retrieveNotes() {
      let result = await api.notes.getNotesList()
      if (result.code === 200) {
        this.notes = result.notes
        return true
      } else {
        return false
      }
    },
    async retrieveNoteById(id) {
      if (this.notes.find(note => note.id === id) !== undefined) {
        let result = await api.notes.getNoteById()
        if (result.code === 200) {
          this.notes.push(result.note)
          return true
        } else {
          return false
        }
      } else {
        return "Note already loaded"
      }
    },
    async saveNoteContent(idNoteToSave, newNoteContent) {
      let index = this.notes.findIndex((note) => note.id === idNoteToSave) 
      this.notes[index].content = newNoteContent
      api.notes.patchNoteContent(idNoteToSave, newNoteContent)
        .then((result) => console.log(result.code))
    },
    async saveNote(noteData) {
      let result = await api.notes.postNote(noteData)

      if (result) {
        this.notes.push(result.data)
        return true
      } else return false
    },
    async saveLiteraryNote(literaryNoteData) {
      let result = await api.notes.postLitearyNote(literaryNoteData)

      if (result) {
        this.literaryNotes.push(result)
        return true
      } else return false

    },
    async removeNote(idNoteToDelete) {
      let result = await api.notes.deleteNote(idNoteToDelete)

      if (result.code === 204) {
        let indexDeletedNote = this.notes.findIndex(
          (note) => note.id === idNoteToDelete
        )
        this.notes.splice(indexDeletedNote, 1)
        return true
      } else {
        return false
      }
    },
    async retrieveFleetingNotes() {
      let result = await api.notes.getFleetingNotesList()
      
      if (result.code === 200) {
        this.fleetingNotes = result.fleetingNotes
        return true
      } else {
        return false
      }
    },
    async createFleetingNote(newNoteContent) {
      const userStore = useUserStore()
      let result = await api.notes.postFleetingNote(newNoteContent, userStore.getUserId)
      
      if (result) {
        this.fleetingNotes.push(result.newFleetingNote) 
        return true 
      } else return false
    },
    async updateFleetingNote(noteId, newNoteContent) {
      let result = await api.notes.patchFleetingNoteContent(noteId, newNoteContent)

      if (result) {
        let index = this.fleetingNotes.findIndex(
          (note) => note.id === noteId
        )
        if (index !== -1) this.fleetingNotes[index].content = newNoteContent
      } else return false
    },
    async removeFleetingNote(noteId) {
      let result = await api.notes.deleteFleetingNote(noteId)

      if (result) {
        let indexNoteToDelete = this.fleetingNotes.findIndex(
          (note) => note.id === noteId
        )
        this.fleetingNotes.splice(indexNoteToDelete, 1)
        return true
      } else return false
    },
    async retrieveLiteraryNotes() {
      let result = await api.notes.getLiteraryNotesList()

      if (result.code === 200) {
        this.literaryNotes = result.literaryNotes
        return true
      } else {
        return false
      }
    },
    async updateLiteraryNote(noteId, noteData) {
      let result = await api.notes.patchLiteraryNote(noteId, noteData)

      if (result) {
        let index = this.literaryNotes.findIndex(
          (note) => note.id === result.data.id
        )
        if (index !== -1) {
          this.literaryNotes[index] = result.data
          return true
        } else return false
      } else return false
    }
  }
})
