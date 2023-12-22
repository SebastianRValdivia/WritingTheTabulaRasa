import { defineStore } from "pinia"
import api from "src/api"

export const useLectureStore = defineStore('lecture', {
  state: () => ({
    lectureList: [],

  }),
  getters: {
    getLectureList: (state) => state.lectureList
  },
  actions: {
    async retrieveLiteLectureList() {
      let result = await api.lectures.getLecturesLite()

      if (result) {
        this.lectureList = result.data
        return true
      } else return false
    }
  },
});
