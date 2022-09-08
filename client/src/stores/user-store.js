import { defineStore } from 'pinia'
import api from "src/api"

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userToken: null,
    username: "",
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
    getUsername: (state) => state.username,
  },
  actions: {
    async logUser(username, password) {
      const thisStore = useUserStore()
      thisStore.saveUsername(username)
      await api.auth.postUserAuthentication(username, password)
        .then( result => {
          if (result.code === 200) {
            this.userToken = result.token
            this.isLogged = true
          } else {
            console.warn("Failed login")
          }
        }) 
    },
    saveUsername(username) {
      this.username = username
    }
  },
});
