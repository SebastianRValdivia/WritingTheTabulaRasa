<template>
  <q-btn
    icon="format_quote"
    flat
    @click="onClick"
  />
</template>

<script>
import { useQuasar } from "quasar"

import api from "src/api"

export default {
  name: "QuoteBtn",
  setup() {
    const quasar = useQuasar()

    async function onClick() {
      const quotesList = await retrieveQuotes()

      if (quotesList.length > 0) {
        let randomQuote = quotesList[
          Math.floor(Math.random() * quotesList.length)
        ]

        quasar.notify({
          message: randomQuote.content,
          position: "bottom-right",
        })
      }
    }
    async function retrieveQuotes() {
      let result = await api.quotes.getQuotes()
      if (result) {
        return result.data
      } else return false
    }

    return {
      onClick,
    }
  }
}
</script>
