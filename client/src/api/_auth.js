import { api } from "boot/axios";

export default {
  postUserAuthentication(username, password) {
    return api.post("v1/users/obtain-token/", {
      username: username,
      password: password,
    })
      .then(response => { return {
        code: response.status,
        token: response.data.token
      }})
      .catch( response => { return {
        code: response.status,
        reason: response.data
      }})
    },
}