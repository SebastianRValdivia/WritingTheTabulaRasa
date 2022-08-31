import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoginOpen: false,
  }),
  getters: {
    isUserLogIn: (state) => state.isLoginOpen
  },
  actions: {
    openLoginDialog () {
      this.isLoginOpen = true
    }
  },
});