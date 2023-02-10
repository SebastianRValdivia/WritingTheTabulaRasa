<template>
  <q-page>
    <div class="row window-height" v-if="!isNoteListEmpty">
      <q-tree
        :nodes="hierarchyNoteList"
        node-key="id"
        class="q-pr-md"
        style="max-width: 15%; width: 15%;"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <span 
              class="text-subtitle1"
              @click="openNote(createNoteIdentifier(prop.node, noteStore.getNotesList, [String(prop.node.identifier)]))"
            >
              {{ createNoteIdentifier(prop.node, userNoteList, [String(prop.node.identifier)]) }}
              {{ prop.node.title }}
            </span>
          </div>
        </template>
      </q-tree>
      <q-separator vertical class="shadow-2 q-mg-md"/>
      <div class="column content-center q-pa-md col-9" >
        <NoteCard 
          v-if="previewNote !== null"
          :identifier="createNoteIdentifier(previewNote, userNoteList, [String(previewNote.identifier)])"
          :note="previewNote"
          @deleted="reloadTree"
        />
      </div>
    </div>

    <div v-else class="row q-pa-xl q-mg-xl justify-center">
      <EmptyAlert />
    </div>

    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn 
        round 
        color="primary" 
        icon="add"
        size="md"
        :to="{name: 'noteEditorPage'}"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar, useMeta } from 'quasar'

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import { constructNoteTree, createNoteIdentifier  } from "src/utils/notes"
import NoteCard from "src/components/for-control/NoteCard"
import EmptyAlert from "src/components/for-viewing/EmptyAlert"

export default {
  components: {
    NoteCard,
    EmptyAlert,
  },
  setup() {
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()
    const $q = useQuasar()

    const userNoteList = ref([])
    const hierarchyNoteList = ref([])
    const previewNote = ref(null)

    const isNoteListEmpty = computed(() => {
      return hierarchyNoteList.value.length === 0
    }) 

    function filterUserNotes() {
      userNoteList.value = noteStore.getNotesByUser(userStore.getUserId)
    }
    async function openNote(noteIdentifier) {
      // Check if note is in the store
      if (noteStore.getNoteByIdentifier(noteIdentifier.split("-")) !== undefined) {
        previewNote.value = noteStore.getNoteByIdentifier(noteIdentifier.split("-"))
      } else { // Else retrieve notes from api and try again
        await noteStore.retrieveNotes()
        if (noteStore.getNoteByIdentifier(noteIdentifier.split("-")) !== undefined) {
          previewNote.value = noteStore.getNoteByIdentifier(noteIdentifier.split("-"))
        } else { // Note doesn't exist
          router.push({ name: "NotFound" })
          previewNote.value = null // To avoid an error
        }
      }
    }
    function reloadTree() {
      filterUserNotes()
      hierarchyNoteList.value = constructNoteTree(userNoteList.value)
      previewNote.value = null
    }

    onBeforeMount(async () => {
      $q.loading.show()
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterUserNotes()
      } 
      hierarchyNoteList.value = constructNoteTree(userNoteList.value)
      await noteStore.retrieveFleetingNotes()
      $q.loading.hide()
    })

    useMeta({
      title: t("noteListPage.pageTitle")
    })

    return {
      noteStore,
      userNoteList,
      hierarchyNoteList,
      isNoteListEmpty,
      createNoteIdentifier,
      openNote,
      previewNote,
      appStore,
      reloadTree,
    }
  }

}
</script>

<style>
#note-list {
  max-width: fit-content;
}
</style>
