import { api } from "boot/axios";
import { recursiveGetCall } from "src/utils/api"

export default {
  async getGoals() {
    let response = await api.get("v1/schedules/goals/")


    if (response.status === 200) {
      return {
        code: response.status,
        goals: response.data.results
      }

    } else {
      return {
        code: response.status,
        reason: response.data.results
      }
    }
  },
  async getGoalById(goalId) {
    try {
      let response = await api.get(`v1/schedules/goals/${goalId}/`)

      if (response.status === 200) {
        return {
          code: 200,
          goal: response.data
        }
      } else return fales
    } catch {
      return false
    }
  },
  async postGoal(goalData) {
    try {
      let response = await api.post(
        "v1/schedules/goals/",
        goalData,
      )

      if (response.status === 201) {
        return {
          code: response.status,
          newGoal: response.data
        }
      }
    } catch {
      return false
    }

  },
  async getObjectives() {
    let response = await api.get("v1/schedules/objectives/")

    if (response.status === 200) {
      return {
        code: response.status,
        objectives: response.data.results
      }
    } else {
      return {
        code: response.status,
        reason: response.data.results
      }
    }
  },
  async getTimeTablesByUser(userId) {
    let result = await recursiveGetCall(
      `v1/schedules/timetables/?owner=${userId}`
    )
    return result
  },
  async getHoursByUser(userId) {
    let result = await recursiveGetCall(
      `v1/schedules/hours/?table=&owner=${userId}`
    )
    return result
  },
  async postHour(hourData) {
    try {
      let response = await api.post("v1/schedules/hours/", hourData)

      if (response) {
        return {
          code: response.status,
          data: response.data
        }
      } else return false
    } catch {
      return false
    }
  }
}
