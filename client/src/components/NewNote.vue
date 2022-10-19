<template>
  <q-card class="text-center note-card-desktop gt-md" >
    <q-card-section class="text-h6 row">
      <q-input 
        v-model="identifier"
        :rules="identifierRules"
      />
      <q-input 
        v-model="title"
        :rules="titleRules"
        class="q-pl-xl"
      />
      <q-space/>
      <q-btn @click="appStore.toggleNewNote" icon="cancel" flat/>
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
    <q-slide-transition>
      <div v-show="saveEnable" class="absolute-bottom q-pa-sm">
        <q-btn round color="secondary" icon="save" @click="saveNote"/>
      </div>
    </q-slide-transition>
  </q-card>

</template>

<script>
import { ref } from "vue"
import { useNoteStore } from "src/stores/note-store"
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"

export default {
  setup() {
    const noteStore = useNoteStore()
    const appStore = useAppStore()

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
      result ? appStore.toggleNewNote() : console.warn(result)
    }

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