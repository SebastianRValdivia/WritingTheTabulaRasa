import { api } from "boot/axios";

export default {
  async getSheets(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/cheatsheets/sheets/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        sheets: data
      }
    } else if ( response.data.next !== null) {
      return this.getSheets(url=response.data.next, previous=data)
    } else {
      return  {
        code: response.status,
        reason: response.data
      }
    }
  },
  async getCheats(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/cheatsheets/cheats/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        cheats: data
      }
    } else if ( response.data.next !== null) {
      return this.getCheats(url=response.data.next, previous=data)
    } else {
      return  {
        code: response.status,
        reason: response.data
      }
    }
  },
}