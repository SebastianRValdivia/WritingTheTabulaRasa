<template>
  <q-page padding class="column items-center">
    <q-input 
      v-model="titleInput"
      :label="$t('practicePage.routineTitle')"
    />

    <q-btn
      class="q-ma-md"
      :label="$t('general.done')"
      @click="submit"
    />
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { usePracticeStore } from "src/stores/practice-store"


export default {
  name: "PracticeRoutineEditorPage",

  setup() {
    const { t } = useI18n()
    const practiceStore = usePracticeStore()

    const titleInput = ref("")

    async function submit() {
      if (titleInput.value) {
        await practiceStore.createPracticeRoutine({
          title: titleInput.value,
        })
      }
    }

    useMeta({
      title: t("practicePage.pageTitle"),
    })
    return {
      titleInput,

      submit,
    }
  }
}

</script>
