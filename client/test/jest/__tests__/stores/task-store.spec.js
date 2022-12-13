import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from 'src/stores/task-store'
import api from "src/api"

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("can retrieve all task", async () => {
    const taskStore = useTaskStore()
    const expectedResult = {
      code: 200,
      tasks: [
        {
            "id": 1,
            "title": "Task 1",
            "completed": false,
            "require": 2,
            "owner": 1
        },
      ]
    }
    jest.spyOn(api.tasks, "getTasks").mockResolvedValue(expectedResult)

    let result = await taskStore.retrieveTasks()
    expect(taskStore.getTaskList).toEqual(expectedResult.tasks)
    expect(result).toBe(true)
  })

  it("can add a new task", async () => {
    const taskStore = useTaskStore()
    const expectedResult = {
      code: 201,
      newTask: [
        {
            "id": 1,
            "title": "Task 1",
            "completed": false,
            "require": 2,
            "owner": 1
        },
      ]
    }
    jest.spyOn(api.tasks, "postTask").mockResolvedValue(expectedResult)

    let result = await taskStore.addNewTask(expectedResult.newTask)
    expect(taskStore.getTaskList[0]).toEqual(expectedResult.newTask)
    expect(result).toBe(true)
  })

  it("can change task status", async () => {
    const taskStore = useTaskStore()
    const expectedResult = {
      code: 200,
      newTask: {
        "id": 1,
        "title": "Task 1",
        "completed": false,
        "require": 2,
        "owner": 1
      },
    }
    taskStore.taskList = [expectedResult.newTask] // Reuse data
    jest.spyOn(api.tasks, "patchTask").mockResolvedValue(expectedResult)

    let result = await taskStore.changeTaskStatus(expectedResult.newTask)
    expect(taskStore.getTaskById(1)).toEqual(expectedResult.newTask)
    expect(result).toBe(true)
  })

  it("can remove task", async () => {
    const taskStore = useTaskStore()
    taskStore.taskList = [{id: 1, title: "Task 1", completed: false, owner:1 }] 
    jest.spyOn(api.tasks, "deleteTask").mockResolvedValue({code: 204})

    let taskData = {taskId: 1}
    let result = await taskStore.removeTask(taskData)
    expect(taskStore.getTaskById(taskData.taskId)).toBe(undefined)
    expect(result).toBe(true)
  })

})
