<template>
  <q-page padding class="row">
    <div
      class="col col-12 self-center"
      v-if="!practiceExercisesList"
    >
      <EmptyMsg :msg="$t('practiceRoutinePreviewPage.noExercises')"/>
    </div>
    <div class="col col-12" v-else>
    <h3 class="text-h3">{{ routineData.title }}</h3>
    <q-list>
      <q-item
        v-for="exercise in practiceExercisesList"
        :key="exercise.id"
      >
        <q-item-section>
          <q-item-label>
            <h4 class="text-h4">
              {{ exercise.title }}
            </h4>
          </q-item-label>
          <q-item-label caption>
            <MarkdownPreview :md="exercise.content"/>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { usePracticeStore } from "src/stores/practice-store"
import EmptyMsg from "src/components/for-viewing/EmptyMsg.vue"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview.vue"

export default {
  name: "PracticeRoutinePreviewPage",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    EmptyMsg,
    MarkdownPreview,
  },
  setup(props) {
    const practiceStore = usePracticeStore()
    const router = useRouter()
    const quasar = useQuasar()
    const { t } = useI18n()

    const routineData = ref({})
    const practiceExercisesList = ref([])

    onBeforeMount(async () => {
      quasar.loading.show()
      const routineId = Number(props.id)

      // Get routine data from store if not found tries to retrieve
      if (practiceStore.getPracticeRoutineById(routineId)){
        routineData.value = practiceStore.getPracticeRoutineById(routineId)
      } else {
        let result = await practiceStore.retrievePracticeRoutine(routineId)
        if (result) {
          routineData.value = practiceStore.getPracticeRoutineById(routineId)
        } else {
          router.push({name: "notFound"})
        }
      }

      // Check if exercises are on the store
      if (practiceStore.getPracticeExercisesByRoutine(routineId).length > 0) {
        practiceExercisesList.value =
          practiceStore.getPracticeExercisesByRoutine(routineId)
      } else { // Tries to retrieve exercises
        let result = await practiceStore.retrievePracticeExercisesByRoutine(
          routineId
        )
        if (result) {
          practiceExercisesList.value =
            practiceStore.getPracticeExercisesByRoutine(routineId)
        } else {
          practiceExercisesList.value = null
        }
      }
      quasar.loading.hide()
    })

    useMeta({
      title: t("practiceRoutinePreviewPage.pageTitle"),
      titleTemplate: (title) => `${title} ${routineData.value.title}`
    })

    return {
      routineData,
      practiceExercisesList,
    }
  }
}
</script>
