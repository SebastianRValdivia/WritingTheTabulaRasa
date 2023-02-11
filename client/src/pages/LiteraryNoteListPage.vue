<template>
  <q-page padding>
    <div class="col-12 row justify-center q-mb-md">
      <q-page-sticky position="top-right" :offset="[20, 20]">
        <q-btn 
          round 
          color="primary" 
          icon="add" 
          size="md" 
          :to="{name: 'literaryNoteEditorPage'}"
        />
      </q-page-sticky>
      <SearchInput @search="searchLiteraryNotes"/>
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
        <q-card-actions align="right">
          <q-btn 
            icon="edit"
            round
            flat
          />
        </q-card-actions>
        <q-card-section>
          <MarkdownPreview :md="note.content"/>
        </q-card-section>
        <q-card-actions
          v-if="resourceStore.getLearningResourceById(note.resource)"
          class="absolute-bottom"
          align="right"
        >
          <span>
            {{ $t("literaryNoteListPage.source") }}:
            {{ resourceStore.getLearningResourceById(note.resource).title }}.
          </span>
        </q-card-actions>
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
import SearchInput from "src/components/for-input/SearchInput"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

export default {
  name: "LiteraryNoteListPage",
  components: {
    SearchInput,
    MarkdownPreview,
  },
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const resourceStore = useResourceStore()

    const searchInput = ref("")

    const displayedNotes = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          noteStore.getLiteraryNotesByUser(userStore.getUserId),
          searchInput.value,
          ["content"]
        )
      } else return noteStore.getLiteraryNotesByUser(userStore.getUserId)
    })

    function searchLiteraryNotes(searchPattern) {
      searchInput.value = searchPattern
    }

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

      displayedNotes,

      searchLiteraryNotes,
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
