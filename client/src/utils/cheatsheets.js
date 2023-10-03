export function cheatsheetHasSize(size) {
  switch (size) {
    case 1:
      return "col-2"
    case 2:
      return "col-5"
    case 3:
      return "col-12"
    default:
      return "col-2"
  }
}
