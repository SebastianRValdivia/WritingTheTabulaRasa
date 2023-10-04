import Fuse from "fuse.js"

export function fuzzySearchByObjectByKeys(list, searchPattern, keysList) {
  let fuzzySearch = new Fuse(
    list,
    {
      keys: keysList
    }
  )
  return fuzzySearch
    .search(searchPattern) // Search the list
    .map((item) => item.item) // Go to item level of the list
}
