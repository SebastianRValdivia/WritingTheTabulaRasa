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


    <br />
    <q-separator />
    <div class="row">
      <div class="column">
        <span class="text-h5">{{ $t("notePages.fleetingNotes") }}</span>
      </div>
    </div>

    <div class="row">
      <q-card 
        class="column other-note-card" 
        v-for="fleetingNote in noteStore.getFleetingNotes" 
        :key="fleetingNote.id"
      >
        <q-card-section class="q-pt-none">
          {{ fleetingNote.content }}
        </q-card-section>
      </q-card>
      <div 
        class="column other-note-card content-center q-pt-xl"
        v-if="!isAddingFleetingNote"
      >
        <q-btn icon="add" round @click="toggleNewFleetingNote"/>
      </div>
      <q-card 
        class="column other-note-card" 
        v-else
      >
        <q-card-section>
          <q-input
            v-model="newFleetingNoteContent"
            type="textarea"
            autogrow
          />
        </q-card-section>
        <q-card-actions align="right" class="absolute-bottom">
          <q-btn round icon="cancel" @click="toggleNewFleetingNote"/>
          <q-btn round icon="check" @click="saveNewFleetingNote"/>
        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
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
    const rootNotes = ref([])
    const newFleetingNoteContent = ref("")
    const isAddingFleetingNote = ref(false)

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

    function toggleNewFleetingNote() {
      isAddingFleetingNote.value = !isAddingFleetingNote.value
    }
    function saveNewFleetingNote() {
      noteStore.createFleetingNote(newFleetingNoteContent.value)
      toggleNewFleetingNote()

    }

    onBeforeMount(async () => {
      isLoading.value = true
      await noteStore.retrieveNotes()
      if (userStore.isUserLogged) {
        filterUserNotes()
      } else {
        filterNotes()
      }
      await noteStore.retrieveFleetingNotes()
      isLoading.value = false
    })


    return {
      isLoading,
      noteStore,
      rootNotes,
      newFleetingNoteContent,
      isAddingFleetingNote,
      toggleNewFleetingNote,
      saveNewFleetingNote,
      isNoteListEmpty,
    }
  }

}
</script>

<style>
#note-list {
  max-width: fit-content;
}
.other-note-card {
  min-width: 15rem;
  min-height: 15rem;
}
</style>