import { api } from "boot/axios";

export default {
  getGoals() {
    return api.get("v1/schedules/goals/")
      .then(response => ({
        code: response.status,
        goals: response.data
      }))
      .catch( response => ({
        code: response.status,
        reason: response.data
      }))
  }
}