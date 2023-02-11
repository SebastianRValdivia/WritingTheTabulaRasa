<template>
  <q-page padding class="column items-center">
    <q-card class="literary-note-card">
      <q-card-section>
        <q-input 
          v-model.number="positionInput"
          type="number"
          :label="$t('literaryNoteEditorPage.location')"
        />
        <q-input 
          v-model="contentInput"
          class="content-input"
          autogrow
          borderless
          :label="$t('literaryNoteEditorPage.content')"
        />
      </q-card-section>
      <q-card-actions align="center" class="absolute-bottom">
        <LearningResourceChooser 
          v-model="resourceInput"
        />
      </q-card-actions>
    </q-card>
    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn 
        v-if="inputComplete"
        icon="done"
        round
        color="primary"
        @click="submit"
      />
    </q-page-sticky>
    <q-page-sticky position="top-left" :offset="[20, 20]">
      <q-btn 
        v-if="props.id"
        icon="delete"
        round
        color="negative"
        @click="deleteNote"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"

import { useUserStore } from "src/stores/user-store" 
import { useNoteStore } from "src/stores/note-store"
import LearningResourceChooser from 
  "src/components/for-control/LearningResourceChooser"
import { dangerConfirmNotification } from "src/utils/notifications"


export default {
  name: "LiteraryNoteNewPage",
  components: {
    LearningResourceChooser,
  },
  props: {
    id: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const userStore = useUserStore()
    const noteStore = useNoteStore()
    const router = useRouter()
    const quasar = useQuasar()
    const { t } = useI18n()

    const contentInput = ref("")
    const positionInput = ref(0)
    const resourceInput = ref()

    const inputComplete = computed(() => {
      if (
        contentInput.value
        && positionInput.value
        && resourceInput.value
      ) return true
      else return false
    })

    function assignResource(resourceId) {
      resourceInput.value = resourceId
    }

    async function submit() {
      async function defineTypeOfAction() {
        if (props.id) { // Already exist
          return await noteStore.updateLiteraryNote(props.id, data)
        } else { // New note
          return await noteStore.saveLiteraryNote(data)
        }
      }
      let data = {
        owner: userStore.getUserId,
        content: contentInput.value,
        position: positionInput.value,
        resource: resourceInput.value,
      }
      let result = await defineTypeOfAction()
      if (result) {
        router.push({name: "literaryNoteListPage"})
      }
    }
    async function deleteNote() {
      quasar.dialog(dangerConfirmNotification(
        t("general.confirm"),
        t("literaryNoteEditorPage.delete")
      )).onOk(async () => {
        let result = await noteStore.removeLiteraryNote(props.id)

        if (result) {
          router.push({name: "literaryNoteListPage"})
        }
      })
    }

    onBeforeMount(() => {
      if (props.id) {
        let noteId = Number(props.id)
        let noteData = noteStore.getLiteraryNoteById(noteId)
        contentInput.value = noteData.content
        resourceInput.value = noteData.resource
        positionInput.value = noteData.position
      }
    })

    return {
      props,
      contentInput,
      positionInput,
      resourceInput,

      inputComplete,
      deleteNote,

      assignResource,
      submit,
    }
  }
}
</script>

<style scoped>
.literary-note-card {
  min-width: 25rem;
  min-height: 30rem;
}
</style>
