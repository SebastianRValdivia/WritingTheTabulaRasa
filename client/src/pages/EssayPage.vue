<template>
  <q-page padding class="column items-center" v-if="essayData">
    <h2 class="text-h2">{{ essayData.title }}</h2>
    <h5 class="text-h5">{{ $t("essayPage.autor")}}: {{ getUsername(essayData.owner) }}</h5>

    <div>
      <MarkdownPreview :md="essayData.content"/>
    </div>

  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useRouter, onBeforeRouteUpdate} from "vue-router"
import { useI18n } from "vue-i18n"

import { useEssayStore } from "src/stores/essay-store"
import { useUserStore } from "src/stores/user-store"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

export default {
  name: "EssayPage",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  components: {
    MarkdownPreview
  },
  setup(props) {
    const quasar = useQuasar()
    const { t } = useI18n()
    const essayStore = useEssayStore()
    const userStore = useUserStore()
    const router = useRouter()

    const essayData = ref()

    async function loadPage(essayUrl) {
      quasar.loading.show()
      essayData.value = essayStore.getEssayByUrl(essayUrl)
      if (!essayData.value) { // Not in store, try to get it
        let result = await essayStore.retrieveEssayByUrl(essayUrl)
        essayData.value = essayStore.getEssayByUrl(essayUrl)
        if (!essayData.value) router.push({name: "notFound"})
      }
      quasar.loading.hide()
    }
    function getUsername(userId) {
      return userStore.getUsernameById(userId)
    }

    onBeforeMount(async () => {
      loadPage(props.url)
    })
    onBeforeRouteUpdate((to) => {
      loadPage(to.params.url)
    })

    useMeta({
      title: t("essayPage.pageTitle"),
      titleTemplate: title => `${title} - ${
        essayData.value ? essayData.value.title : null
      }`
    })

    return {
      essayData,
      
      getUsername,
    }
  }
}
</script>
