import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
  },
  actions: {
    logUser() {
      this.isLogged = true;
    }
  },
});
