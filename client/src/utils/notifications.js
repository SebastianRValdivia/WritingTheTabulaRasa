export const errorNotification = (msg) => {
  return {
    type: "negative",
    message: msg,
    position: "bottom-left",
  }
}
