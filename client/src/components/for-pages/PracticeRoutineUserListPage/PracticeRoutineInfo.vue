<template>
  <div class="scoped-practice-outline" @click="pushToPracticeRoutinePage">
    <h4 class="text-h4">{{ practiceRoutineData.title }}</h4>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import { usePracticeStore } from "src/stores/practice-store"

export default {
  name:"PracticeRoutineInfo",
  props: {
    practiceRoutineId: {
      required: true,
      type: Number
    }
  },
  setup(props) {
    const practiceStore = usePracticeStore()
    const router = useRouter()

    const practiceRoutineData = ref()

    function pushToPracticeRoutinePage() {
      router.push({name: "home"})
    }

    onBeforeMount(() => {
      practiceRoutineData.value = practiceStore.getPracticeRoutineById(
        props.practiceRoutineId
      )
    })

    return {
      practiceRoutineData,

      pushToPracticeRoutinePage,
    }
  }
}
</script>

<style>
.scoped-practice-outline {
  max-height: 10rem;
  border-bottom: 1px solid black;
}
</style>
