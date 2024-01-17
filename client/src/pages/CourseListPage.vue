<template>
  <q-page
    class="q-pa-md row justify-center q-gutter-md"
  >
    <div
      v-for="lecture in displayedLectures"
      :key="lecture.id"
      class="col-2"
    >
      <LectureCard
        :title="lecture.title"
        :description="lecture.description"
        :thumbnail="lecture.thumbnail"
      >
      </LectureCard>
    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n} from "vue-i18n"

import { useCourseStore } from "src/stores/course-store"
import LectureCard from "src/components/for-viewing/LectureCard.vue"

export default {
  name: "LectureListPage",
  components: {
    LectureCard
  },
  setup() {
    const courseStore = useCourseStore()
    const { t } = useI18n()
    const quasar = useQuasar()

    const searchPattern = ref("")

    const displayedLectures =  computed(() => {
      if (searchPattern.value) {
        return fuzzySearchByObjectByKeys(
          courseStore.getLectureList,
          searchPattern.value,
          ['title',]
        )
      } else {
        return courseStore.getLectureList
      }
    })


    onBeforeMount(async () => {
      let result = await courseStore.retrieveLiteLectureList()

      if (!result) quasar.notify(errorNotification(t("general.failed")))
    })

    useMeta({
      title: t("lectureListPage.pageTitle")
    })

    return {
      displayedLectures
    }
  }
}
</script>
