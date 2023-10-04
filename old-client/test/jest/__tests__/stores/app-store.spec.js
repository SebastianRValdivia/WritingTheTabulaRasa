import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from 'src/stores/app-store'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it("set log in dialog open", () => {
    const appStore = useAppStore()
    appStore.openLoginDialog()
    expect(appStore.isLoginOpen).toBe(true)
  })

  it("can set tabs", () => {
    const appStore = useAppStore()
    let tabs = {
      "tabName": "tabUrl",
      "tabName2": "tabUrl2"
    }
    appStore.setTabs(tabs)

    expect(appStore.isTabsOpen).toBe(true)
    expect(appStore.getTabs).toMatchObject(tabs)

    appStore.clearTabs()
    expect(appStore.getTabs).toMatchObject({})
  })

  it("can toggle new note status", () => {
    const appStore = useAppStore()
    appStore.toggleNewNote() // Default is false so it turns true
    expect(appStore.isNewNoteOpen).toBe(true)
    appStore.toggleNewNote() // Now set it false
    expect(appStore.isNewNoteOpen).toBe(false)
  })
})
