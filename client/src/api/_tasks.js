
import { api } from "boot/axios";

export default {
  async getTasks(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/tasks/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        tasks: data
      }
    } else if ( response.data.next !== null) {
      return this.getTasks(url=response.data.next, previous=data)
    } else {
      return  {
        code: response.status,
        reason: response.data
      }
    }
  }
}