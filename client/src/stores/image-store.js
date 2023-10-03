import { defineStore } from "pinia"
import api from "src/api"

export const useImageStore = defineStore("image", {
  state: () => ({
    imageList: [],
  }),
  getters: {
    getImageList: (state) => state.imageList,
    getImageById: (state) => {
      return (imgId) => state.imagesList.find(
        (img) => img.id === imgId
      )
    },
  },
  actions: {
    async retrieveImages() {
      let result = await api.images.getImages()

      if (result) {
        this.imageList = result.data
        return true
      } else return false
    },
    async createImageResource(imageData) {
      let result = await api.images.postImages(imageData)

      if (result) {
        this.imagesList.push(result.data)
        return result.data
      } else return false
    }
  }
})
