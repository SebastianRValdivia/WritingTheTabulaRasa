<template>
  <q-page padding>
  </q-page>
</template>

<script>
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { ref, onMounted } from "vue"

import api from "src/api"


export default {
  name: "IndexPage",
  setup() {
    const { t } = useI18n()


    useMeta({
      title: t("indexPage.pageTitle")
    })

    return {
    }
  }
}
</script>
