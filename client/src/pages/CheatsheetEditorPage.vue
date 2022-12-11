<template>
  <q-page class="q-pa-md justify-center">
    <div class="row q-pb-md">
      <q-input 
        v-model="sheetTitleInput" 
        :placeholder="sheetInitialState.title"
        input-class="text-h3"
      />
      <q-space/>
      <q-btn v-if="!isNew" icon="delete" color="negative" @click="deletePage"/>
      <q-btn :label="$t('done')" color="primary" @click="saveCheatsheet"/>
    </div>
    <div class="row q-pb-xl">
      <q-input 
        v-model="sheetDescriptionInput"
        autogrow 
        :placeholder="sheetInitialState.description" 
      />
    </div>

    <div class="row">
      <!-- Cheat card preview -->
      <q-card 
        v-for="(cheat, index) in cheatList" 
        :key="index"
        class="cheat-card"
        :class="cheatsheetHasSize(cheat.size)" 
      >
        <q-card-section>
          {{ cheat.title }}
        </q-card-section>
        <q-card-section>
          <MarkdownPreview :md="cheat.content" />
        </q-card-section>
      </q-card>
      <q-card 
        class="cheat-card"
        :class="cheatsheetHasSize(cheatSizeInput)" 
      >
        <q-card-section>
          <q-input v-model="cheatTitleInput"/>
        </q-card-section>
        <q-card-section>
          <q-input type="textarea" v-model="cheatContentInput"/>
        </q-card-section>
        <q-card-actions>
          <q-btn-group rounded>
            <q-btn color="primary" rounded glossy icon="remove" @click="reduceSize()"/>
            <q-btn color="primary" rounded glossy icon="add" @click="expandSize()"/>
          </q-btn-group>
          <q-space/>
          <q-btn round icon="done" @click="addCheat"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, reactive } from "vue"
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"
import { useRouter, onBeforeRouteUpdate } from "vue-router"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"
import { cheatsheetHasSize } from "src/utils/cheatsheets"

export default {
  name: "CheatsheetEditorPage",
  components: {
    MarkdownPreview
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
    const cheatTitleInput = ref("") 
    const cheatContentInput = ref("")
    const cheatSizeInput = ref(2)

    function addCheat() {
      let newCheat = {
        title: null,
        content: null,
        size: null,
      }
      newCheat.title = cheatTitleInput.value
      newCheat.content = cheatContentInput.value
      newCheat.size = cheatSizeInput.value
      
      cheatList.value.push(newCheat)
      clearInputs()
    }
    function clearInputs() {
      cheatTitleInput.value = ""
      cheatContentInput.value = ""
      cheatSizeInput.value = 2
    }
    async function saveCheatsheet() {
      if (isNew.value) {
        let sheetCreated = await cheatsheetStore.createSheet({
          title: sheetTitleInput.value,
          description: sheetDescriptionInput.value
        })
        if (sheetCreated) {
          cheatList.value.forEach(async (cheat) => {
            let cheatCreated = await cheatsheetStore.createCheat({
              title: cheat.title,
              content: cheat.content,
              sheet: sheetCreated.id,
              size: cheat.size,
            })
          })
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
    function reduceSize() {
      1 < cheatSizeInput.value
        ? cheatSizeInput.value -= 1
        : console.log("cant more")
    }
    function expandSize() {
      2 >= cheatSizeInput.value
        ? cheatSizeInput.value += 1
        : console.log("cant more")
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
      title: t("cheatSheetNewPage.pageTitle"),
    })
    return {
      isNew,
      sheetInitialState,
      sheetTitleInput,
      sheetDescriptionInput,
      cheatList,
      cheatTitleInput,
      cheatContentInput,
      cheatSizeInput,
      addCheat,
      saveCheatsheet,
      cheatsheetHasSize,
      reduceSize,
      expandSize,
      deletePage,
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
