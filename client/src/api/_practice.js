import { api } from "boot/axios"

export default {
  async postPracticeRoutine(routineData) {
    try {
      let response = await api.post(
        "v1/practice/routines/",
        routineData,
      )

      if (response) {
        return {
          code: response.code,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  },
}
