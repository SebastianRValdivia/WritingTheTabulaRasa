<template>
  <q-page padding class="row">
    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn round icon="done" color="primary" @click="submit"/>
    </q-page-sticky>
    <div class="col col-12 row q-gutter-md q-pb-md">
      <q-input
        v-model="sheetTitleInput"
        class="col col-7"
        :placeholder="sheetInitialState.title"
        input-class="text-h4"
        :label="$t('cheatSheetEditorPage.sheetTitle')"
        :rules="[val => !!val || $t('general.required')]"
      />
      <q-input
        filled
        v-model="sheetColorInput"
        :rules="['hexColor']"
        class="col col-4"
        :style="{'background-color': sheetColorInput}"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="sheetColorInput" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
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
      <CheatCard
        v-for="(cheat, index) in cheatList"
        :key="index"
        :cheatData="cheat"
        :color="sheetColorInput"
        @click.ctrl="deleteCheat(index)"
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
import CheatInput from
  "src/components/for-pages/CheatsheetEditorPage/CheatInput.vue"
import CheatCard from "src/components/for-viewing/CheatCard.vue"

export default {
  name: "CheatsheetEditorPage",
  components: {
    CheatInput,
    CheatCard,
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
    const sheetColorInput = ref()


    function deleteCheat(index) {
      cheatList.value.splice(index, 1)
    }

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
          description: sheetDescriptionInput.value,
          color: sheetColorInput.value,
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
        router.push({name: "cheatsheetListPage"})
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
        router.push({name: "cheatsheetListPage"})
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
      sheetColorInput,
      cheatList,

      updateCheat,
      addCheat,
      deletePage,
      deleteCheat,

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
