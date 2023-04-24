// Send a string to the clipboard
export function copyToClipboard(textToCopy) {
  navigator.clipboard.writeText(textToCopy)
}
