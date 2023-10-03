<template>
  <q-page padding class="row" v-if="practiceRoutineData">
    <h3 class="text-h3 col-12">
      {{ practiceRoutineData.title }}
    </h3>
    
    <div class="col-12 column items-center">
      <q-btn
        color="positive"
        :label="$t('practiceRoutineUserPage.doNow')"
        :to="{name: 'practiceRoutinePage', params: {id: practiceRoutineData.id}}"
      />
    </div>
    
    <q-table
      class="col col-12"
      v-if="completionsList.length > 0"
      :columns="completionsTableColumns"
      :rows="completionsList"
    ></q-table>
    <div v-else class="col col-12 column items-center text-grey">
      <h3>
        {{ $t("practiceRoutineUserPage.neverDone") }}
      </h3>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { useQuasar, useMeta } from "quasar"

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
    const quasar = useQuasar()
    const practiceStore = usePracticeStore()
    const router = useRouter()
    const { t } = useI18n()

    const practiceRoutineData = ref()
    const completionsList = ref([])
    const completionsTableColumns = [
      {
        name: "routineId",
        required: true,
        label: "Routine ID",
        field: row => row.id,
      },
      {
        name: "completion",
        required: true,
        label: "Completion Date",
        field: row => row.updated,
      }
    ]

    async function loadPage() {
      async function retrieveCompletions() {
        let result = await practiceStore.retrieveUserCompletedPracticeRoutines()
        if (result) {
          completionsList.value = practiceStore.
            getUserPracticeRoutineCompletionsByRoutineId(
              routineId
            )
          return true
        } else return false
      }
      const routineId = Number(props.id) // Convert to int

      practiceRoutineData.value = practiceStore.getPracticeRoutineById(
        routineId
      )
      // If is false is not in the store so tries to retrieve
      if (!practiceRoutineData.value) {
        let result = await practiceStore.retrievePracticeRoutine(routineId)
        if (result) {
          practiceRoutineData.value = practiceStore.getPracticeRoutineById(
            routineId
          )
          let retrieveCompletionsResult = await retrieveCompletions()
        } else {
          // It does not exist
          router.push({name: "notFound"})
        }
      } else {
        let retrieveCompletionsResult = await retrieveCompletions()
      }
    }

    onBeforeMount(async () => {
      quasar.loading.show()
      await loadPage()
      quasar.loading.hide()
    })

    useMeta({
      pageTitle: t("practiceRoutineUserPage.pageTitle")
    })
    return {
      practiceRoutineData,
      completionsList,
      completionsTableColumns,
    }
  }
}
</script>
