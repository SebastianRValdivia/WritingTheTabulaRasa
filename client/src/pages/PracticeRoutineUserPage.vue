<template>
{{ practiceRoutineData }}
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import { usePracticeStore } from "src/stores/practice-store"

export default {
  name: "PracticeRoutineUserPage",
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {

    const practiceStore = usePracticeStore()
    const router = useRouter()

    const practiceRoutineData = ref()

    onBeforeMount(async () => {
      practiceRoutineData.value = practiceStore.getPracticeRoutineById(
        Number(props.id)
      )
      // If is false is not in the store so tries to retrieve
      if (!practiceRoutineData.value) {
        let result = await practiceStore.retrievePracticeRoutine(Number(props.id))
        if (result) {
          practiceRoutineData.value = practiceStore.getPracticeRoutineById(
            Number(props.id)
          )
        } else {
          router.push({name: "notFound"})
        }
      }
    })
    return {
      practiceRoutineData,
    }
  }
}
</script>
