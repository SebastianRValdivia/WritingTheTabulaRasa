import { defineStore } from 'pinia'
import api from "src/api"

export const useNoteStore = defineStore('note', {
   state: () => ({
    notes: []
   }),
   getters: {
    notesList: state => state.notes,
   },
   actions: {
    async retrieveNotes() {
      await api.notes.getNotesList().then(result => {
        if (result.code === 200) {
          this.notes = result.notes
        }
      })

    }

   }

})