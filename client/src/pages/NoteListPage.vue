<template>
  <q-page>
    <div class="row window-height" v-if="!isNoteListEmpty">
      <q-tree
        :nodes="hierarchyNoteList"
        node-key="id"
        default-expand-all
        class="q-pr-md"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <router-link 
              :to="{
                name: 'note',
                params: {identifier: createNoteIdentifier(
                  prop.node,
                  noteStore.getNotesList, 
                  [String(prop.node.identifier)]
                )},
                force: true
              }"
            >
              <span class="text-subtitle1">
                {{ createNoteIdentifier(prop.node, noteStore.getNotesList, [String(prop.node.identifier)])}}
                {{ prop.node.title }}
              </span>
            </router-link>
          </div>
        </template>
      </q-tree>
      <q-separator vertical class="gt-md"/>
      <div class="column content-center q-pa-md col-9" >
        <router-view ></router-view>
      </div>
    </div>

    <div v-else class="row q-pa-xl q-mg-xl justify-center">
      <div class="text-h2" style="opacity:.4">
        {{ $t("notePages.empty")}}
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="secondary" icon="add" size="lg" :to="{name: 'newNote'}"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar } from 'quasar'

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import { constructNoteTree, createNoteIdentifier  } from "src/utils"

export default {
  setup() {
    const noteStore = useNoteStore()
    const userStore = useUserStore()
    const appStore = useAppStore()
    const { t } = useI18n()
    const $q = useQuasar()

    const hierarchyNoteList = ref([])

    const isNoteListEmpty = computed(() => {
      return hierarchyNoteList.value.length === 0
    }) 

    function filterUserNotes() {
      hierarchyNoteList.value = noteStore.getNotesByUser(userStore.getUserId)
    }

    function filterNotes() {
      hierarchyNoteList.value = noteStore.notesList
    }

    onBeforeMount(async () => {
      $q.loading.show()
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
      hierarchyNoteList.value = constructNoteTree(hierarchyNoteList.value)
      await noteStore.retrieveFleetingNotes()
      $q.loading.hide()
    })
    onBeforeUnmount(() => {
      appStore.clearTabs()
    })


    return {
      noteStore,
      hierarchyNoteList,
      isNoteListEmpty,
      createNoteIdentifier,
    }
  }

}
</script>

<style>
#note-list {
  max-width: fit-content;
}
</style>