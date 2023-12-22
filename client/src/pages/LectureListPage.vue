<template>
  <q-page>

  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n} from "vue-i18n"

import { useLectureStore } from "src/stores/lecture-store"

export default {
  name: "LectureListPage",
  setup() {
    const lectureStore = useLectureStore()
    const { t } = useI18n()
    const quasar = useQuasar()

    const lectureList = ref([])

    onBeforeMount(async () => {
      let result = await lectureStore.retrieveLiteLectureList()

      if (!result) quasar.notify(errorNotification(t("general.failed")))
    })

    useMeta({
      title: t("lectureListPage.pageTitle")
    })

    return {
    }
  }
}
</script>
