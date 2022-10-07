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
  async getUserIdByUsername(username) {
    let response = await api.get(`v1/users/data/?username=${username}`)

    if (response.status === 200) {
      return {
        code: response.status,
        userId: response.data.results[0].pk
      }
    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  }
}