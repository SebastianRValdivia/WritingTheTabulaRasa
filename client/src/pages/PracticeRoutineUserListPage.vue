<template>
  <q-page padding class="row">

      <PracticeRoutineInfo 
        class="col col-12"
        v-for="userPractice in userPracticeRoutinesList"
        :key="userPractice.id"
        :practiceRoutineId="userPractice.routine"
      />

  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { usePracticeStore } from "src/stores/practice-store"
import { useUserStore } from "src/stores/user-store"
import PracticeRoutineInfo from 
  "src/components/for-pages/PracticeRoutineUserListPage/PracticeRoutineInfo"

export default {
  name: "PracticeRoutineUserListPage",
  components: {
    PracticeRoutineInfo
  },
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

      userPracticeRoutinesList.value =
        practiceStore.getAssignedPracticeRoutinesByUser(userStore.getUserId)

      quasar.loading.hide()
    })

    return {
      userPracticeRoutinesList
    }

  }
}

</script>
