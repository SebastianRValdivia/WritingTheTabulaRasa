<template>
  <q-page padding>
  </q-page>
</template>

<script>
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { defineComponent, onMounted } from "vue"

import api from "src/api"


export default defineComponent({
  name: "IndexPage",
  setup() {
    const { t } = useI18n()


    useMeta({
      title: t("indexPage.pageTitle")
    })

    return {
    }
  }
})
</script>
