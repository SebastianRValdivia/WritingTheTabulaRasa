import { api } from "boot/axios"

export default {
  async getWikiPages(url=null, previous=[]) {
    let response = url === null 
    ? await api.get("v1/encyclopedia/pages/") 
    : await api.get(url)

    let data = [...previous, ...response.data.results]

    if (response.status === 200 && response.data.next === null) {
      return {
        code: response.status,
        pages: data
      } 
    } else if (response.data.next !== null) {
        return this.getWikiPages(response.data.next, data)
    } else {
      return {
        code: response.status,
      }
    }
  },
  async getWikiPageByUrl(url) {
    let response = await api.get(`v1/encyclopedia/pages/?url=${url}`)

    if (response.status === 200 && response.data.results[0] !== undefined) {
      return {
        code: 200,
        page: response.data.results[0]
      }
    } else {
      return {
        code: 404
      }
    }
  },
  async getWikiCardByPageId(pageId) {
    try {
      let response = await api.get(`v1/encyclopedia/cards/?page=${pageId}`)
      if (response.status === 200 && response.data.results[0] !== undefined) {
        return {
          code: 200,
          card: response.data.results[0]
        }
      } else return {
        code: 404
      }
    } catch {
      return {
        code: 400
      }
    }
  },
  async postWikiPage(pageData) {
    try {
      let response = await api.post("v1/encyclopedia/pages/", pageData)
      if (response.status === 201) return {
          code: 201,
          newPage: response.data
      }
    } catch {
      return {
        code: 400
      }
    }
  },
  async postWikiCard(cardData) {
    try {
      let response = await api.post("v1/encyclopedia/cards/", cardData)
      if (response.status === 201) return {
          code: 201,
          newCard: response.data
      }
    } catch {
      return {
        code: 400
      }
    }
  }
}
