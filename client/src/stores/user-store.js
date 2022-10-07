import { defineStore } from 'pinia'
import api from "src/api"

import { setUserCookies } from "src/storage/cookies"

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
    getToken: (state) => state.userToken,
  },
  actions: {
    async retrieveUserCredentials(username, password) {
      const userStore = useUserStore()
      this.username = username
      await api.user.postUserAuthentication(username, password)
        .then( async result => {
          if (result.code === 200) {
            await userStore.retrieveUserId()
            this.userToken = result.token
            setUserCookies(this.username, this.userId, this.userToken)
            this.isLogged = true
          } else {
            console.warn("Failed login")
          }
        }) 
    },
    async retrieveUserId() {
      let result = await api.user.getUserIdByUsername(this.getUsername)
      if (result.code === 200) {
        this.userId = result.userId
      } else {
        console.warn("Failed to get user id")
      }
    },
    saveUserCredentials(username, userId, token) {
      this.username = username
      this.userId = userId
      this.userToken = token
      this.isLogged = true
    }
  },
});
