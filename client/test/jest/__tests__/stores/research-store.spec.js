import { setActivePinia, createPinia } from "pinia"
import { useResearchStore } from "src/stores/research-store"
import api from "src/api"

describe("Research Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("retrieves a research process by id and store it", async () => {
    const researchStore = useResearchStore()
    const researchProcessId = 1
    const expectedResult = {
      code: 200, 
      researchProcess: {
        "id": 1,
        "title": "Research process",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "conclusion": "",
        "created": "",
        "updated": "",
    }}

    jest.spyOn(api.research, "getResearchProcessById").mockResolvedValue(
      expectedResult
    )
    const result = await researchStore.retrieveResearchProcessById(researchProcessId)
    expect(result).toBe(true)
    expect(researchStore.getResearchProcessById(researchProcessId))
      .toEqual(expectedResult.researchProcess)
  })

})
