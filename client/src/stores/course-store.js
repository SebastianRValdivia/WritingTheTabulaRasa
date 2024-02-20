import { defineStore } from "pinia"
import api from "src/api"

export const useCourseStore = defineStore('course', {
  state: () => ({
    lectureList: [],

  }),
  getters: {
    getLectureList: (state) => state.lectureList
  },
  actions: {
    async retrieveLiteLectureList() {
      let result = await api.courses.getLectures()

      if (result) {
        this.lectureList = result.data
        return true
      } else return false
    }
  },
});
