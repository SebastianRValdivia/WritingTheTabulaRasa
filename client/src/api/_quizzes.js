import { api } from "boot/axios"

export default {
  async getQuizzesObjects(url=null, previous=[]) {
    try {
      let response = url === null 
        ? await api.get("v1/quizzes/quizzes-objects/") 
        : await api.get(url)

      let data = [...previous, ...response.data.results]

      if (response.status === 200 && response.data.next === null) {
        return {
          code: response.status,
          quizzesList: data
        } 
      } else if (response.data.next !== null) {
        return this.getQuizzesObjects(response.data.next, data)
      } else return false
    } catch {
      return false
    }
  }
}
