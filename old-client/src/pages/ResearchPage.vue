<template>
  <q-page class="column items-center">
    <h2 class="text-h2">{{ researchProcess.title }}</h2>
    <h5 class="text-h5">{{ researchProcess.description }}</h5>
    <span class="row">
      {{ $t("researchPage.startDate")}}: 
      {{ date.formatDate(researchProcess.created, "MM-DD-YYYY") }}
    </span>

    <q-separator />
    <h4 class="text-h4">{{ researchProcess.conclusion}}</h4>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { date, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useResearchStore } from "src/stores/research-store"

export default {
  name: "ResearchPage",
  props: {
    id: String
  },
  setup(props) {
    const { t } = useI18n()
    const researchStore = useResearchStore()

    const researchProcess = ref({})

    onBeforeMount(async () => {
      let result = await researchStore.retrieveResearchProcessById(props.id)
      if (result) {
        researchProcess.value = researchStore.getResearchProcessById(
          Number(props.id)
        )
      }
    })

    useMeta({
      title: t("researchPage.pageTitle"),
      titleTemplate: title => `${title} - N°${props.id}`,
    })

    return {
      props,
      researchProcess,
      date,
    }
  }
}
</script>
