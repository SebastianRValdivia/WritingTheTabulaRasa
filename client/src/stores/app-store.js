import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoginOpen: false,
    tabs: false,
  }),
  getters: {
    isUserLogIn: (state) => state.isLoginOpen,
    isTabsOpen: (state) => state.isTabsOpen,
  },
  actions: {
    openLoginDialog () {
      this.isLoginOpen = true
    },
    toggleTabs() {
      this.tabs = !this.tabs
    }
  },
});