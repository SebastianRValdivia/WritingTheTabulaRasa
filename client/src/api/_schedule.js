import { api } from "boot/axios";

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
  }
}