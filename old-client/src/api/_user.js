import { api } from "boot/axios";

export default {
  async postUserAuthentication(username, password) {
    let response = await api.post("v1/users/obtain-token/", {
      username: username,
      password: password,
    })

    if (response.status === 200) {
      return {
        code: response.status,
        token: response.data.token
      }

    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  },
  async getUserPreferencesByUserId(userId) {
    let response = await api.get(`v1/users/preferences/?owner__id=${userId}`)

    if (response.status === 200) {
      return {
        code: response.status,
        userPreferences: response.data.results[0]
      }
    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  },
  async getUsersData(url=null, previous=[]) {
    try {
      let response = url === null 
      ? await api.get("v1/users/data/") 
      : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: response.status,
          usersList: data
        } 
      } else if (response.data.next !== null) {
          return this.getUsersData(response.data.next, data)
      } else return false
    } catch {
      return false
    }
  },
  async getUserData(userName) {
    try {
      let response = await api.get(`v1/users/data/?username=${userName}`)
      if (response.status === 200) {
        return {
          code: response.status,
          data: response.data.results[0]
        }
      } else return false
    } catch {
      return false 
    }
  },
  async getUserDataById(userId) {
    try {
      let response = await api.get(`v1/users/data/?id=${userId}`)
      if (response.status === 200) {
        return {
          code: response.status,
          data: response.data.results[0]
        }
      } else return false
    } catch {
      return false 
    }
  }
}
