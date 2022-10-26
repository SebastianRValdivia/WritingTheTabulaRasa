import { defineStore } from "pinia";
import api from "src/api"
export const useWikiStore = defineStore("wiki", {
  state: () => ({
    wikiPages: []

  }),
  getters: {
    getWikiPageByUrl: (state) => {
      return (pageUrl) => state.wikiPages.find((page) => page.url === pageUrl)
    },
    getWikiPageList: (state) => state.wikiPages
  },
  actions: {
    async retrieveWikiPages() {
      let result = await api.wiki.getWikiPages() 

      if (result.code === 200) {
        this.wikiPages = result.pages
      }
    },
    async retrieveWikiPageByUrl(url) {
      let result = await api.wiki.getWikiPageByUrl(url)

      if (result.code === 200) {
        this.wikiPages.push(result.page)
      }
    }
  }
})