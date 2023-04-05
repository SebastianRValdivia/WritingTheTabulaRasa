<template>
  <q-page padding class="column items-center">
    <q-input />
  </q-page>
</template>

<script>
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

export default {
  name: "PracticeRoutineEditorPage",

  setup() {
    const { t } = useI18n()

    useMeta({
      title: t("practicePage.pageTitle"),
    })
  }
}

</script>
