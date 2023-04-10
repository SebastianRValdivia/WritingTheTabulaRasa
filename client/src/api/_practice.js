import { api } from "boot/axios"
import { recursiveGetCall } from "src/utils/api"

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
  async getPracticeRoutinesList() {
    try {
      let result = await recursiveGetCall("v1/practice/routines/")

      if (result) {
        return {
          code: result.code,
          data: result.data,
        }
      } else return false
    } catch {
      return false
    }
  },
  async getPracticeRoutineById(routineId) {
    try {
      let response = await api.get(`v1/practice/routines/${routineId}/`)

      if (response) {
        return {
          code: response.code,
          data: response.data,
        }
      } else return false
    } catch {
      return false
    }
  },
  async getAssignedPracticeRoutines() {
    try {
      let result = await recursiveGetCall("v1/practice/assigned-routines/")

      if (result) {
        return {
          code: result.code,
          data: result.data,
        }
      } else return false
    } catch {
      return false
    }
  },
  async getCompletedPracticeRoutinesByUser(userId) {
    try {
      let result = await recursiveGetCall(
        `v1/practice/completions/?owner=${userId}`
      )

      if (result) {
        return {
          code: result.code,
          data: result.data,
        }
      } else return false
    } catch {
      return false
    }
  },
  async getPracticeExercisesByRoutine(routineId) {
    try {
      let result = await recursiveGetCall(
        `v1/practice/exercises/?routine=${routineId}`
      )

      if (result) {
        return {
          code: result.code,
          data: result.data,
        }
      }
    } catch {
      return false
    }
  },
}
