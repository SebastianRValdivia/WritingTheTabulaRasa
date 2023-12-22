<template>
  <q-page>

  </q-page>
</template>

<script>
import { useMeta } from "quasar"
import { useI18n} from "vue-i18n"

export default {
  name: "LectureListPage",
  setup() {
    const { t } = useI18n()

    useMeta({
      title: t("lectureListPage.pageTitle")
    })
  }
}
</script>
