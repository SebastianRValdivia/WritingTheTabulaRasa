<template>
  <q-page>
    <div
      v-for="lecture in displayedLectures"
      :key="lecture.id"
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

import { useLectureStore } from "src/stores/lecture-store"
import LectureCard from "src/components/for-viewing/LectureCard.vue"

export default {
  name: "LectureListPage",
  components: {
    LectureCard
  },
  setup() {
    const lectureStore = useLectureStore()
    const { t } = useI18n()
    const quasar = useQuasar()

    const searchPattern = ref("")

    const displayedLectures =  computed(() => {
      if (searchPattern.value) {
        return fuzzySearchByObjectByKeys(
          lectureStore.getLectureList,
          searchPattern.value,
          ['title',]
        )
      } else {
        return lectureStore.getLectureList
      }
    })


    onBeforeMount(async () => {
      let result = await lectureStore.retrieveLiteLectureList()

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
