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
      />

      <!-- Input card for new cheat -->
      <q-card 
        class="cheat-card col"
        :class="cheatsheetHasSize(cheatSizeInput)" 
      >
        <q-card-section>
          <q-input 
            v-model="cheatTitleInput"
            input-class="text-h6"
            :label="$t('cheatSheetEditorPage.cheatTitle')"
            :rules="[val => !!val || $t('general.required')]"
          />
        </q-card-section>
        <q-card-section>
          <q-input 
            type="textarea" 
            v-model="cheatContentInput"
            :rules="[val => !!val || $t('general.required')]"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn-group flat>
            <q-btn color="primary" flat icon="remove" @click="reduceSize()"/>
            <q-btn color="primary" flat icon="add" @click="expandSize()"/>
          </q-btn-group>
          <q-space/>
          <q-btn round color="primary" icon="done" @click="addCheat"/>
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
import { cheatsheetHasSize } from "src/utils/cheatsheets"
import CheatPreview from 
  "src/components/for-pages/CheatsheetEditorPage/CheatPreview"

export default {
  name: "CheatsheetEditorPage",
  components: {
    CheatPreview,
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
      // Create the cheat obj and add it to the list of cheats
      if (cheatTitleInput.value && cheatContentInput.value) {
        let newCheat = {
          title: cheatTitleInput.value,
          content: cheatContentInput.value,
          size: cheatSizeInput.value,
        }
        cheatList.value.push(newCheat)
      }
      clearInputs()
    }
    function clearInputs() {
      cheatTitleInput.value = ""
      cheatContentInput.value = ""
      cheatSizeInput.value = 2
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
      title: t("cheatSheetEditorPage.pageTitle"),
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
      cheatsheetHasSize,
      reduceSize,
      expandSize,
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
