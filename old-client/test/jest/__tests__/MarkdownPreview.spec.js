import { mount } from "@vue/test-utils"
import MarkdownPreview from "src/components/MarkdownPreview"

describe("MarkdownPreview", () => {
  it("renders markdown text", () => {
    let h1Title = "This is a rendered h1 element"
    let markdownTitle = `# ${h1Title}`
    const wrapper = mount(MarkdownPreview, {
      propsData: {
        md: markdownTitle
      }
    })

    expect(wrapper.find("h1").text()).toEqual(h1Title)
  }) 
})

