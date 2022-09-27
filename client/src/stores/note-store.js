import { defineStore } from "pinia"
import api from "src/api"
import { filterNoteFamily } from "src/utils"
import { useUserStore } from "src/stores/user-store"

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [],
    fleetingNotes: [],
  }),
  getters: {
    notesList: (state) => state.notes,
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
    getNotesByParent: (state) => {
      return (parentId) => state.notes
        .filter((note) => note.parent === parentId)
    },
    getRootNotes: (state) => (state.notes.filter((note) => note.parent === null)),

    getFleetingNotes: (state) => state.fleetingNotes,
  },
  actions: {
    async retrieveNotes() {
      await api.notes.getNotesList().then(result => {
        if (result.code === 200) {
          this.notes = result.notes
        }
      })
    },
    async retrieveNoteById(id) {
      if (this.notes.find(note => note.id === id) !== undefined) {
        await api.notes.getNoteById().then(result => {
          if (result.code === 200) {
            this.notes.push(result.note)
          } else {
            return result.code
          }
        })
      } else {
        return "Note already loaded"
      }
    },
    async saveNoteContent(idNoteToSave, newNoteContent) {
      let index = this.notesList.findIndex((note) => note.id === idNoteToSave) 
      this.notesList[index].content = newNoteContent
      api.notes.patchNoteContent(idNoteToSave, newNoteContent)
        .then((result) => console.log(result.code))
    },
    async retrieveFleetingNotes() {
      await api.notes.getFleetingNotesList().then(result => {
      if (result.code === 200) {
        this.fleetingNotes = result.fleetingNotes
        return true
      } else {
        return false
      }})
    },
    async createFleetingNote(newNoteContent) {
      const userStore = useUserStore()
      await api.notes.postFleetingNote(newNoteContent, userStore.getUserId)
        .then(
          (result) => (
            result.code === 201 
            ? this.fleetingNotes.push(result.newFleetingNote) 
            : console.log(result)
        ))
    }
  }
})