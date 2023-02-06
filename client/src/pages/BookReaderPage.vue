<template>
  <q-page padding>
    <MarkdownPreview v-if="!bookMd" :md="bookMd"/>
    <div v-else class="column items-center text-grey">
      <h1 class="text-h1">
        Cannot retrieve book
      </h1>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

import axios from 'axios'

export default {
  name: "BookReaderPage",
  components: {
    MarkdownPreview
  },
  setup() {
    const quasar = useQuasar()
    
    const bookMd = ref()

    onBeforeMount(async () => {
      quasar.loading.show()

      let requestResult = await axios.get('https://raw.githubusercontent.com/SebastianRValdivia/WritingTheTabulaRasa/main/docs/Book/English/index.md')
      if (requestResult) {
        bookMd.value = requestResult.data
      } else {
        bookMd.value = false
      }

      quasar.loading.hide()
    })

    return {
      bookMd
    }
  }
}



</script>
