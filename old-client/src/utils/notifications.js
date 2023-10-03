export const errorNotification = (msg) => {
  return {
    type: "negative",
    message: msg,
    position: "bottom-left",
  }
}

export const dangerConfirmNotification = (title, msg) => {
  return {
    title: title,
    message: msg,
    cancel: true,
    color: "negative"
  }
}
