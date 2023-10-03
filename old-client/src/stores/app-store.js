import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoginOpen: false,
    tabs: {},
    isNewNoteOpen: false
  }),
  getters: {
    isUserLogIn: (state) => state.isLoginOpen, // TODO: is WHAT?
    isTabsOpen: (state) => Object.keys(state.tabs).length > 0,
    getTabs: (state) => state.tabs,
    getIsNewNoteOpen: (state) => state.isNewNoteOpen,
  },
  actions: {
    openLoginDialog () {
      this.isLoginOpen = true
    },
    setTabs(pathNames) {
      this.tabs = pathNames
    },
    clearTabs() {
      this.tabs = {}
    },
    toggleNewNote() {
      this.isNewNoteOpen = !this.isNewNoteOpen
    }
  },
});