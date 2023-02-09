<template>
  <q-page padding class="column items-center">
    <q-card class="text-center note-card-desktop" >
      <q-card-section class="row">
        <q-input 
          v-model="identifier"
          :rules="identifierRules"
        />
        <q-input 
          v-model="title"
          :rules="titleRules"
          class="q-pl-xl"
          input-class="text-h5"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
        <q-input 
          type="textarea" 
          v-model="content"
          class="q-pl-xl"
          autogrow 
          borderless
          style="min-width: 49rem"
        />
      </q-card-section>
    </q-card>
    <q-page-sticky v-show="saveEnable" position="top-right" :offset="[20, 20]">
      <q-btn round color="primary" icon="done" @click="saveNote"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import { errorNotification } from "src/utils/notifications"

export default {
  setup() {
    const noteStore = useNoteStore()
    const appStore = useAppStore()
    const router = useRouter()
    const quasar = useQuasar()
    const { t } = useI18n()

    const identifier = ref("")
    const title = ref("")
    const content = ref("")
    const saveEnable = ref(true)


    const titleRules = [ val => val.length > 0 ]
    const identifierRules = [ 
      val => val.length > 0,
      val => noteStore.getNoteByIdentifier(val.split("-")) == undefined,
      val => {
        let identifiers = val.split("-")
        for (let id of identifiers) {
          if (isNaN(id)) { return false }
        }
      }
    ]
    
    async function saveNote() {
      let userStore = useUserStore()
      let result = await noteStore.saveNote({
        title: title.value,
        content: content.value,
        owner: userStore.getUserId,
        identifier: identifier.value,
        parent: null, // TODO
      })
      if (result) {
        router.push({name: "noteListPage"})
      } else {
        quasar.notify(errorNotification(t("general.failed")))
      }
    }

    useMeta({
      title: t("noteEditorPage.pageTitle")
    })

    return {
      identifier,
      title,
      content,
      saveEnable,
      saveNote,
      titleRules,
      identifierRules,
      appStore
    }
  }
}
</script>

<style>
.note-card-desktop {
  min-width: 50rem;
  min-height: 35rem;
  max-width: 50rem;
  max-height: 35rem;
}
</style>
