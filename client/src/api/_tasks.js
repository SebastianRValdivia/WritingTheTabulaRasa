
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
  },
  async postTask(taskData) {
    let response = await api.post("v1/tasks/", taskData)

    if (response.status === 201) {
      return {
        code: response.status,
        newTask: response.data
      }
    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  },
  async patchTask(taskId, newStatus) {
    let response = await api.patch(`v1/tasks/${taskId}/`,
      {completed: newStatus}
    )

    if (response.status === 200) {
      return {
        code: response.status,
        newTask: response.data
      }
    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  },
  async deleteTask(taskId) {
    let response = await api.delete(`v1/tasks/${taskId}/`)
    if (response.status === 204) {
      return {
        code: response.status
      }
    } else {
      return {
        code: response.status,
        reason: response.data
      }
    }
  }
}