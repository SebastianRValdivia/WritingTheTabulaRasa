import { Cookies } from "quasar"

const strictOptions = {
    secure: true,
    expires: 7,
    sameSite: "Strict"
}


export function setUserCookies(username, userId, token) {
  Cookies.set("username", username, strictOptions)
  Cookies.set("userId", userId, strictOptions)
  Cookies.set("token", token, strictOptions)
}
export function removeUserCookies(username, userId, token) {
  Cookies.remove("username")
  Cookies.remove("userId")
  Cookies.remove("token")
}
