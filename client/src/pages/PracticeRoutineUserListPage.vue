<template>
  <q-page padding>

  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { usePracticeStore } from "src/stores/practice-store"
import { useUserStore } from "src/stores/user-store"

export default {
  name: "PracticeRoutineUserListPage",
  setup() {
    const practiceStore = usePracticeStore()
    const userStore = useUserStore()
    const quasar = useQuasar()

    const userPracticeRoutinesList = ref([])

    onBeforeMount(async () => {
      quasar.loading.show()
      // TODO: Check for error
      await practiceStore.retrievePracticeRoutines()
      quasar.loading.hide()
    })




  }
}

</script>

