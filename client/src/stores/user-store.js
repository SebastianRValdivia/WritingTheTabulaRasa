import { defineStore } from 'pinia'
import api from "src/api"

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userToken: null,
    userId: null,
    username: "",
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
    getUsername: (state) => state.username,
    getUserId: (state) => state.userId,
  },
  actions: {
    async logUser(username, password) {
      const userStore = useUserStore()
      userStore.saveUsername(username)
      await api.user.postUserAuthentication(username, password)
        .then( async result => {
          if (result.code === 200) {
            await userStore.retrieveUserId()
            this.userToken = result.token
            this.isLogged = true
          } else {
            console.warn("Failed login")
          }
        }) 
    },
    async retrieveUserId() {
      await api.user.getUserIdByUsername(this.getUsername)
        .then( result => {
          if (result.code === 200) {
            this.userId = result.userId
          } else {
            console.warn("Failed to get user id")
          }

      })
    },
    saveUsername(username) {
      this.username = username
    }
  },
});
