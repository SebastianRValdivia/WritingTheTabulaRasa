<template>
  <q-page padding>
    <SearchInput @search="searchPracticeRoutines"/>
    <AddNewBtn :to="{name: 'practiceRoutineEditorPage'}"/>
    <div class="row q-gutter-md">
      <q-card
        v-for="practiceRoutine in displayedPracticeRoutines"
        :key="practiceRoutine.id"
        class="col"
      >
        <q-card-actions
          v-if="userStore.isUserLogged"
          align="right"
        >
          <p
            v-if="isUserAssignedToRoutine(practiceRoutine.id)"
          > {{ $t("practiceRoutineListPage.enlisted") }}</p>
          <q-btn
            v-else
            icon="add_box"
            @click="enlist(practiceRoutine.id)"
          />
        </q-card-actions>
        <q-card-section>
          <h4 class="text-h4">{{ practiceRoutine.title }}</h4>
          <MarkdownPreview :md="practiceRoutine.description"/>
        </q-card-section>
        <q-card-actions
          class="absolute-bottom"
          align="center"
        >
          <q-btn
            icon="visibility"
            flat
            :to="{
              name: 'practiceRoutinePreviewPage',
              params: {
                id: practiceRoutine.id
              }
            }"
          />
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from "quasar"

import { usePracticeStore } from "src/stores/practice-store"
import { useUserStore } from "src/stores/user-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"
import SearchInput from "src/components/for-input/SearchInput.vue"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview.vue"
import AddNewBtn from "src/components/for-input/AddNewBtn.vue"

export default {
  name: "PracticeRoutineListPage",
  components: {
    SearchInput,
    MarkdownPreview,
    AddNewBtn,
  },
  setup() {
    const practiceStore = usePracticeStore()
    const userStore = useUserStore()
    const quasar = useQuasar()

    const searchPattern = ref("")
    const userPracticeRoutines = ref([])

    const displayedPracticeRoutines = computed(() => {
      if (searchPattern.value) {
        return fuzzySearchByObjectByKeys(
          practiceStore.getPracticeRoutines,
          searchPattern.value,
          ["title"]
        )
      } else {
        return practiceStore.getPracticeRoutines
      }

    })

    function searchPracticeRoutines(pattern) {
      searchPattern.value = pattern
    }
    function isUserAssignedToRoutine(routineId) {
      // Search if there is an element in the list
      // If there is the index will be > -1
      let index = userPracticeRoutines.value.findIndex((practiceRoutine) => {
        return practiceRoutine.routine === routineId
      })
      return index !== -1
    }
    async function enlist(routineId) {
      let result =
        await practiceStore.createAssignedPracticeRoutineToUser(routineId)
      userPracticeRoutines.value =
        practiceStore.getAssignedPracticeRoutinesByUser(userStore.getUserId)
    }

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await practiceStore.retrievePracticeRoutines()
      let resultUserPracticeRoutines =
        await practiceStore.retrieveAssignedPracticeRoutines()
      userPracticeRoutines.value =
        practiceStore.getAssignedPracticeRoutinesByUser(userStore.getUserId)
      if (result) {
        quasar.loading.hide()
      }
    })

    return {
      userStore,
      searchPattern,

      displayedPracticeRoutines,

      searchPracticeRoutines,
      isUserAssignedToRoutine,
      enlist,
    }

  }
}
</script>
