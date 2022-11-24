import { setActivePinia, createPinia } from "pinia"
import { useUserStore } from "src/stores/user-store"
import api from "src/api"

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("save user credentials", () => {
    const userStore = useUserStore()

    const USERNAME = "user"
    const ID = 1
    const TOKEN = "asdf"

    userStore.saveUserCredentials(USERNAME, ID, TOKEN)

    expect(userStore.isUserLogged).toBe(true)
    expect(userStore.getUsername).toEqual(USERNAME)
    expect(userStore.getUserId).toEqual(ID)
    expect(userStore.getToken).toEqual(TOKEN)
  })

  it("retrieves user id and store it", async () => {
    const userStore = useUserStore()
    const expectedResult = {code: 200, userId: 1}

    jest.spyOn(api.user, "getUserIdByUsername").mockResolvedValue(expectedResult)

    const result = await userStore.retrieveUserId()
    expect(result).toBe(true)
    expect(userStore.getUserId).toEqual(expectedResult.userId)
  })
})