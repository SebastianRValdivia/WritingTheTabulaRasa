export function cheatsheetHasSize(size) {
  switch (size) {
    case 1:
      return "col-3"
    case 2:
      return "col-6"
    case 3:
      return "col-12"
    default:
      return "col"
  }
}
