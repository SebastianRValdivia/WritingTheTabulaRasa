import { api } from "boot/axios"

export async function recursiveGetCall(url, previous=[]) {
  try {
    let response = await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        data: data
      } 
    } else if (response.data.next !== null) {
      return recursiveGetCall(response.data.next, data)
    } else return false
  } catch {
    return false
  }
}
