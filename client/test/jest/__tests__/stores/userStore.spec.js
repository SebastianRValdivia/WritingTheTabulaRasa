import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from "src/stores/user-store"

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
})