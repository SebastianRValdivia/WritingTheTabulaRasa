export function countWords(text) {
  return text.split(" ").length - 1
}

export function countCharacters(text) {
  return text.replace(/(\r\n|\n|\r)/gm, "").length
}
