import { defineStore } from 'pinia'
import api from "src/api"

import { setUserCookies } from "src/storage/cookies"

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userToken: null,
    userId: null,
    username: "",
    userPreferences: {}
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
    getUsername: (state) => state.username,
    getUserId: (state) => state.userId,
    getToken: (state) => state.userToken,
    getUserPreferences: (state) => state.userPreferences,
  },
  actions: {
    async retrieveUserCredentials(username, password) {
      const userStore = useUserStore()
      this.username = username
      try {
          let result = await api.user.postUserAuthentication(username, password)
          this.userToken = result.token
          await userStore.retrieveUserId()
          setUserCookies(this.username, this.userId, this.userToken)
          this.isLogged = true
      } catch {
        return {
          code: 400
        }
      }
    },
    async retrieveUserId() {
      try {
        let result = await api.user.getUserIdByUsername(this.getUsername)
        this.userId = result.userId
      } catch {
        console.warn("Failed to get user id")
      }
    },
    saveUserCredentials(username, userId, token) {
      this.username = username
      this.userId = userId
      this.userToken = token
      this.isLogged = true
    },
    async retrieveUserPreferences() {
      let result = await api.user.getUserPreferencesByUserId(this.userId)

      if (result.code === 200) {
        this.userPreferences = result.userPreferences
        return true
      } else { return false }
    }
  },
});
