<template>
  <LoadingSpinner v-if="isLoading"/>

  <div v-else>
    <div class="row" v-if="!isNoteListEmpty">
      <q-list id="note-list" class="column">
        <q-item v-for="note in rootNotes" :key="note.id">
          <NoteChildren :note="note" />
        </q-item>
      </q-list>
      <q-separator vertical/>
      <router-view ></router-view>
    </div>
    <div v-else class="row q-pa-xl q-mg-xl justify-center">
      <div class="text-h2" style="opacity:.4">
        {{ $t("notePages.empty")}}
      </div>
    </div>


  </div>
</template>

<script>
import { ref, onBeforeMount, computed, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import NoteChildren from "src/components/for-pages/NoteChildren"
import LoadingSpinner from "src/components/LoadingSpinner"

export default {
  components: {
    NoteChildren,
    LoadingSpinner,
},
  setup() {
    const isLoading = ref(false)
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()

    const rootNotes = ref([])

    const isNoteListEmpty = computed(() => {
      return rootNotes.value.length === 0
    }) 

    function filterUserNotes() {
      rootNotes.value = noteStore.getNotesByUser(userStore.getUserId)
        .filter(note => note.parent == null)
    }

    function filterNotes() {
        rootNotes.value = noteStore.notesList
          .filter(note => note.parent == null)
    }

    onBeforeMount(async () => {
      isLoading.value = true
      appStore.setTabs({
        [t("notePages.permanent")]: "notes",
        [t("notePages.fleeting")]: "fleetingNotes",
        [t("notePages.literary")]: "literaryNotes",
      })
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterUserNotes()
      } else {
        filterNotes()
      }
      await noteStore.retrieveFleetingNotes()
      isLoading.value = false
    })
    onBeforeUnmount(() => {
      appStore.clearTabs()
    })


    return {
      isLoading,
      noteStore,
      rootNotes,
      isNoteListEmpty,
    }
  }

}
</script>

<style>
#note-list {
  max-width: fit-content;
}
</style>