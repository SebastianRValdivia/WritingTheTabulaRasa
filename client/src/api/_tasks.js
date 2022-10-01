
import { api } from "boot/axios";

export default {
  getTasks() {
    return api.get("v1/tasks/")
      .then(response => ({
        code: response.status,
        tasks: response.data
      }))
      .catch( response => ({
        code: response.status,
        reason: response.data
      }))
  }
}