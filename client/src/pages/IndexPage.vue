<template>
  <q-page padding>
    <div class="row justify-center">
      <div>{{ quote.content }}</div>
    </div>
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

    const quote = ref("")

    onMounted(async () => {
      let quotesResult = await api.quotes.getQuotes()
      quote.value = quotesResult.quotesList[Math.floor(Math.random() * quotesResult.quotesList.length)]
    })



    useMeta({
      title: t("indexPage.pageTitle")
    })

    return {
      quote
    }
  }
}
</script>
