import { defineStore } from 'pinia'
import api from "src/api"

export const useNoteStore = defineStore('note', {
   state: () => ({
    notes: []
   }),
   getters: {
    notesList: (state) => state.notes,
    getNoteById: (state) => {
      return (noteId) => state.notes.find((note) => note.id === noteId)
    },
    getNotesByUser: (state) => {
      return (userId) => state.notes.filter((note) => note.owner === userId)
    }
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
    }
   }

})