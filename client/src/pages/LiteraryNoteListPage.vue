<template>
  <q-page padding>
    <div class="col-12 row justify-center q-mb-md">
      <q-page-sticky position="top-right" :offset="[20, 20]">
        <q-btn 
          round 
          color="primary" 
          icon="add" 
          size="md" 
          :to="{name: 'literaryNoteNewPage'}"
        />
      </q-page-sticky>
      <q-input 
        rounded
        outlined
        v-model="searchInput"
        class="col-4"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div 
      class="row justify-center q-gutter-md"
      v-if="displayedNotes.length > 0"
    > 
      
      <q-card
        v-for="note in displayedNotes"
        :key="note.id"
        class="col-5 literary-note-card"
      >
        <q-card-section
          v-if="resourceStore.getLearningResourceById(note.resource)"
        >
          {{ resourceStore.getLearningResourceById(note.resource).title }}
        </q-card-section>
        <q-card-section>
          {{ note.content }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useAppStore } from "src/stores/app-store"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useResourceStore } from "src/stores/resource-store"
import { fuzzySearchByObjectByKeys } from "src/utils/search"

export default {
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const resourceStore = useResourceStore()

    const searchInput = ref("")

    const displayedNotes = computed(() => {
      if (searchInput.value) {
        return (fuzzySearchByObjectByKeys(
          noteStore.getLiteraryNotesByUser(userStore.getUserId),
          searchInput.value,
          ["content"]
        ))
      } else return noteStore.getLiteraryNotesByUser(userStore.getUserId)
    })

    onBeforeMount(async () => {
      quasar.loading.show()
      await noteStore.retrieveLiteraryNotes()
      await resourceStore.retrieveLearningResources()
      quasar.loading.hide()
    })

    useMeta({
      title: t("literaryNoteListPage.pageTitle")
    })

    return {
      resourceStore,

      searchInput,

      displayedNotes,
    }
  }


}
</script>

<style>
.literary-note-card {
  max-height: 20rem;
  min-height: 20rem;
}
</style>
