import { defineStore } from 'pinia'
import api from "src/api"

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userToken: null,
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
  },
  actions: {
    async logUser(username, password) {
      await api.auth.postUserAuthentication(username, password)
        .then( result => {
          if (result.code === 200) {
            this.userToken = result.token
            this.isLogged = true
          } else {
            console.warn("Failed login")
          }
        }) 
    }
  },
});
