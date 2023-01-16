<template>
  <q-page padding>
    <q-input 
      v-model="titleInput" 
      :placeholder="$t('essayEditorPage.essayTitle')"
      input-class="text-h2"
    />
    <div class="text-subtitle1">
      {{$t("general.by")}}: {{ userStore.getUsername }}
    </div>
    <q-input
      v-model="contentInput"
      class="q-pa-md"
      :placeholder="$t('essayEditorPage.essayBody')"
      autogrow
      borderless
    />
    <q-page-sticky
      position="top-right"
      :offset="[20, 20]"
    >
      <q-btn
        icon="done"
        round
        color="primary"
        @click="submit"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useEssayStore } from "src/stores/essay-store"
import { useUserStore } from "src/stores/user-store"
import { errorNotification } from "src/utils/notifications"

export default {
  name: "EssayEditorPage",
  props: {
    url: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const { t } = useI18n()
    const essayStore = useEssayStore()
    const userStore = useUserStore()
    const router = useRouter()
    const quasar = useQuasar()

    const titleInput = ref("")
    const contentInput = ref("")

    function checkIfInputsAreCorrect() {
      if (!titleInput.value) return false
      if (!contentInput.value) return false
      return true
    }

    async function submit() {
      if (checkIfInputsAreCorrect()) {
        let result = await essayStore.saveEssay({
          title: titleInput.value,
          content: contentInput.value,
          owner: userStore.getUserId
        })
        if (result) {
          router.push({name: "essaysListPage"})
        } else {
          quasar.notify(errorNotification(t("general.failed")))
        }
      } else {
        quasar.notify(errorNotification(t("essayEditorPage.incompleteData")))
      }

    }

    useMeta({
      title: t("essayEditorPage.pageTitle")
    })
    return {
      titleInput,
      contentInput,

      userStore,
      
      submit,
    }
  }
}
</script>
