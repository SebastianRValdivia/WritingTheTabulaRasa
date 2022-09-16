import { api } from "boot/axios";

export default {
  postUserAuthentication(username, password) {
    return api.post("v1/users/obtain-token/", {
      username: username,
      password: password,
    })
      .then(response => ({
        code: response.status,
        token: response.data.token
      }))
      .catch( response => ({
        code: response.status,
        reason: response.data
      }))
  },
  getUserIdByUsername(username) {
    return api.get(`v1/users/data/?username=${username}`)
      .then(response => ({
        code: response.status,
        userId: response.data[0].pk
      }))
      .catch( response => ({
        code: response.status,
        reason: response.data
      }))
  }
}