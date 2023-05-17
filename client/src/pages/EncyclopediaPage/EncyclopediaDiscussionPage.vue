<template>
discussion
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar } from "quasar"

import api from "src/api"

export default {
  name: "EncyclopediaDiscussionPage",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const quasar = useQuasar()

    const postList = ref([])
    
    async function loadPage() {
      let result = await api.wiki.getWikiDiscussionPostsByPageId()      
    }
    onBeforeMount(async () => {
      quasar.loading.show()
      await loadPage()
      quasar.loading.hide()
    })

    return {
    }
  }
}
</script>
