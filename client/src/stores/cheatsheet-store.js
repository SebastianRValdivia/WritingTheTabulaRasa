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
    getCheatsBySheetId: (state) => {
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
    },
    async retrieveSheetByUrl(url) {
      let result = await api.cheatsheets.getSheetByUrl(url)

      if (result.code === 200 && this.getSheetByUrl(url) === undefined) { // Got the sheet and is not in the store
        this.sheets.push(result.sheet)
        return true
      } else return false
    },
    async retrieveCheatsBySheetId(sheetId) {
      let result = await api.cheatsheets.getCheatsBySheetId(sheetId)

      if (result) {
        // Cheat doesn't exist in store
        result.cheats.forEach(newCheat => {
          if (!this.cheats.find((cheat) => cheat.id === newCheat.id)) {
            this.cheats.push(newCheat)
          }
        });
        return true
      } else return false
    },
    async createSheet(newSheetData) {
      let result = await api.cheatsheets.postSheet(newSheetData)

      if (result.code === 201) {
        this.sheets.push(result.newSheet)
        return result.newSheet
      } else {
        return false
      }
    },
    async createCheat(newCheatData) {
      let result = await api.cheatsheets.postCheat(newCheatData)

      if (result.code === 201) {
        this.cheats.push(result.newCheat)
        return true
      } else {
        return false
      }
    },
    async removeSheetById(sheetId) {
      let result = await api.cheatsheets.deleteSheetById(sheetId)

      if (result) {
        sheets = sheets.filter((sheet) => sheet.id === sheetId )
        return true
      } else return false
    },
    async changeSheet(sheetId, newSheetData) {
      let result = await api.cheatsheets.patchSheet(sheetId, newSheetData)

      if (result) {
        // Find the index of the changed sheet
        let sheetIndex = this.sheets.findIndex((sheet) => sheet.id === sheetId)
        // Update sheet data is store
        if (~sheetIndex) this.sheets[sheetIndex] = result.updatedSheet
        return true
      } else return false

    },
  }
})
