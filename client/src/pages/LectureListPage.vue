<template>
  <q-page>
    <div>
      <q-card
        v-for="lecture in displayedLectures"
        :key="lecture.id"
      >
        {{ lecture.title }}

      </q-card>

    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n} from "vue-i18n"

import { useLectureStore } from "src/stores/lecture-store"

export default {
  name: "LectureListPage",
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
