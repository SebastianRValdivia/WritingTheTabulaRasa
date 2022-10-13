import { defineStore } from "pinia"
import api from "src/api"

export const useCheatsheetStore = defineStore("cheatsheet", {
  state: () => ({
    sheets: [],
    cheats: []
  }),
  getters: {
    getSheets: (state) => state.sheets,
    getSheetByUrl: (state) => {
      return (sheetUrl) => state.sheets.find((sheet) => sheet.url === sheetUrl)
    },
    getCheatsBySheet: (state) => {
      return (sheetId) => state.cheats.filter((cheat) => cheat.sheet === sheetId)
    }
  },
  actions: {
    async retrieveCheats() {
      let result = await api.cheatsheets.getCheats()

      if (result.code === 200) {
        this.cheats = result.cheats
        return true
      } else {
        return false
      }
    },
    async retrieveSheets() {
      let result = await api.cheatsheets.getSheets()

      if (result.code === 200) {
        this.sheets = result.sheets
        return true
      } else {
        return false
      }
    }
  }
})