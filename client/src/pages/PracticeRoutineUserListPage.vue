<template>
  <q-page padding>

    {{ practiceStore.getAssignedPracticeRoutinesByUser(userStore.getUserId)}}

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
      await practiceStore.retrieveAssignedPracticeRoutines()
      quasar.loading.hide()
    })

    return {
      practiceStore,
      userStore,
    }

  }
}

</script>

