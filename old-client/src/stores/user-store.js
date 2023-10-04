import { defineStore } from 'pinia'
import api from "src/api"

import { setUserCookies, removeUserCookies } from "src/storage/cookies"

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userToken: null,
    userId: null,
    username: "",
    userData: {},
    userPreferences: {},
    usersList: []
  }),
  getters: {
    isUserLogged: (state) => state.isLogged,
    getUserName: (state) => state.username,
    getUserId: (state) => state.userId,
    getToken: (state) => state.userToken,
    getUserData: (state) => state.userData,
    getUserPreferences: (state) => state.userPreferences,
    getUsernameById: (state) => {
      return (userId) => {
        let userData = state.usersList.find((user) => user.pk === userId)
        if (userData) return userData.username
      }
    },
    getUserDataById: (state) => {
      return (userId) => state.usersList.find( (user) => user.pk === userId )
    }
  },
  actions: {
    async retrieveUserCredentials(userName, password) {
      const userStore = useUserStore()
      this.username = userName
      try {
        let result = await api.user.postUserAuthentication(userName, password)
        this.userToken = result.token
        await userStore.retrieveUserData(userName)
        setUserCookies(this.username, this.userId, this.userToken)
        this.isLogged = true
        return true
      } catch {
        return false
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
    },
    logOutUser() {
      removeUserCookies()
      this.isLogged = false
    },
    async retrieveUsersData() {
      let result = await api.user.getUsersData()

      if (result) {
        this.usersList = result.usersList
        return true
      } else return false
    },
    async retrieveUserDataById(userId) {
      let result = await api.user.getUserDataById(userId)

      if (result.code === 200) {
        this.usersList.push(result.data)
        return true
      } else return false
    },
    async retrieveUserData() {
      let result = await api.user.getUserData(this.getUserName)

      if (result) {
        this.userId = result.data.pk
        this.userData = result.data
        return true
      } else return false
    },
  }
});
