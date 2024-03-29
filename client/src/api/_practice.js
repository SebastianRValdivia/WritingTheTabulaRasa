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
          code: response.status,
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
  async postCompletedPracticeRoutine(routineCompletionData) {
    try {
      let response = await api.post(
        "v1/practice/completions/",
        routineCompletionData,
      )

      if (response) {
        return {
          code: response.status,
          data: response.data
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
  async postAssignPracticeRoutine(data) {
    try {
      let result = await api.post(
        "v1/practice/assigned-routines/",
        data
      )

      if (result.status === 201) {
        return {
          code: result.code,
          data: result.data,
        }
      } else return false
    } catch {
      return false
    }
  },
  async postPracticeExercise(exerciseData) {
    try {
      let response = await api.post(
        "v1/practice/exercises/",
        exerciseData,
      )

      if (response.status === 201) {
        return {
          code: response.status,
          data: response.data,
        }
      }
    } catch {
      return false
    }
  },
}
