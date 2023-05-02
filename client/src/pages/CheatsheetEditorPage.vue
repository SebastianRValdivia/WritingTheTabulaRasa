<template>
  <q-page padding class="row">
    <div class="col col-12 row q-pb-md">
      <q-input 
        v-model="sheetTitleInput" 
        :placeholder="sheetInitialState.title"
        input-class="text-h3"
        :label="$t('cheatSheetEditorPage.sheetTitle')"
        :rules="[val => !!val || $t('general.required')]"
      />
      <q-space/>
      <q-page-sticky position="top-right" :offset="[20, 20]">
        <q-btn round icon="done" color="primary" @click="submit"/>
      </q-page-sticky>
    </div>
    <div class="col col-9 q-pb-xl">
      <q-input 
        v-model="sheetDescriptionInput"
        autogrow 
        borderless
        :label="$t('cheatSheetEditorPage.sheetDescription')"
        :placeholder="sheetInitialState.description" 
        :rules="[val => !!val || $t('general.required')]"
      />
    </div>

    <div class="col col-12 row justify-center q-gutter-sm">
      <!-- Cheat card preview -->
      <CheatPreview 
        v-for="(cheat, index) in cheatList" 
        :key="index"
        :cheatData="cheat"
        @onUpdated="updateCheat"
      />

      <!-- Input card for new cheat -->
      <CheatInput
        @onDone="addCheat"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, reactive } from "vue"
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useRouter, onBeforeRouteUpdate } from "vue-router"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import { cheatsheetHasSize } from "src/utils/cheatsheets"
import CheatPreview from 
  "src/components/for-pages/CheatsheetEditorPage/CheatPreview"
import CheatInput from
  "src/components/for-pages/CheatsheetEditorPage/CheatInput"

export default {
  name: "CheatsheetEditorPage",
  components: {
    CheatPreview,
    CheatInput,
  },
  props: {
    url: String
  },
  setup(props) {
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()
    const router = useRouter()

    const isNew = ref()
    const sheetInitialState = reactive({
      id: null,
      title: "",
      description: "",
    })
    const sheetTitleInput = ref("")
    const sheetDescriptionInput = ref("")
    const cheatList = ref([])

    function updateCheat(currentTitle, updatedCheatData) {
      // search cheat by current title and then update the data
      let indexOfCheatToChange = 
        cheatList.value.findIndex( (cheat) => cheat.title === currentTitle)
      cheatList.value[indexOfCheatToChange] = updatedCheatData
    }
    function addCheat(newCheat) {
      // Add cheat to cheats list
      cheatList.value.push(newCheat)
    }
    async function submit() {
      if (isNew.value) {
        let sheetCreated = await cheatsheetStore.createSheet({
          title: sheetTitleInput.value,
          description: sheetDescriptionInput.value
        })
        if (sheetCreated) {
          for (let cheat of cheatList.value) {
            let cheatCreationResult = await cheatsheetStore.createCheat({
              title: cheat.title,
              content: cheat.content,
              sheet: sheetCreated.id,
              size: cheat.size,
            })
          }
        }
        router.push({name: "cheatsheets"})
      } else {
        let sheetUpdate = await cheatsheetStore.changeSheet(
          sheetInitialState.id, // SheetId
          { // SheetData
            title: sheetTitleInput.value,
            description: sheetDescriptionInput.value,
          }
        )
      }
    }
    function deletePage() {
      if (sheetInitialState.id !== null){
        cheatsheetStore.removeSheetById(sheetInitialState.id)
        router.push({name: "cheatsheets"})
      } else {
        console.error("No id")
      }
    }
    async function loadPage(sheetUrl) {
      if(sheetUrl) {
        isNew.value = false
        let sheet = cheatsheetStore.getSheetByUrl(sheetUrl)
        sheetInitialState.id = sheet.id
        sheetInitialState.title = sheet.title
        sheetInitialState.description = sheet.description
        if (cheatsheetStore.getCheatsBySheetId(sheet.id) > 0) {
          cheatList.value = cheatsheetStore.getCheatsBySheetId(sheetInitialState.id)
        } else {
          await cheatsheetStore.retrieveCheatsBySheetId(sheet.id)
          cheatList.value = cheatsheetStore.getCheatsBySheetId(sheetInitialState.id)
        }
      } else {
        isNew.value = true
      }
    }

    onBeforeMount(() => {
      loadPage(props.url)
    })
    onBeforeRouteUpdate((to) => {
      loadPage(to.params.url)
    })


    useMeta({
      title: t("cheatSheetEditorPage.pageTitle"),
    })
    return {
      isNew,
      sheetInitialState,
      sheetTitleInput,
      sheetDescriptionInput,
      cheatList,

      updateCheat,
      addCheat,
      deletePage,

      submit,
    }
  }
}
</script>

<style>
.cheat-card {
  width: 100%;
  max-width: 500px;
}
</style>
