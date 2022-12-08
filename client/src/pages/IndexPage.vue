<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/logo.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"


export default {
  name: "IndexPage",
  setup() {
    const { t } = useI18n()

    useMeta({
      title: t("indexPage.pageTitle")
    })
  }
}
</script>
