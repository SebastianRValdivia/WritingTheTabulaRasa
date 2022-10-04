import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoginOpen: false,
    tabs: {},
  }),
  getters: {
    isUserLogIn: (state) => state.isLoginOpen,
    isTabsOpen: (state) => Object.keys(state.tabs).length > 0,
    getTabs: (state) => state.tabs,
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
    }
  },
});