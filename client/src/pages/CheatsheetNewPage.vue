<template>
  <q-page class="q-pa-md justify-center">
    <div class="row q-pb-xl">
      <q-input v-model="sheetTitleInput" input-class="text-h3"/>
      <q-space/>
      <q-btn :label="$t('done')" color="primary" @click="saveCheatsheet"/>
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
import { ref } from "vue"
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"
import { cheatsheetHasSize } from "src/utils/cheatsheets"

export default {
  name: "CheatsheetNewPage",
  components: {
    MarkdownPreview
  },
  setup() {
    const { t } = useI18n()
    const cheatsheetStore = useCheatsheetStore()

    const sheetTitleInput = ref("")
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
    }
    async function saveCheatsheet() {
      let sheetCreated = await cheatsheetStore.createSheet({
        title: sheetTitleInput.value
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

    useMeta({
      title: t("cheatSheetNewPage.pageTitle"),
    })
    return {
      sheetTitleInput,
      cheatList,
      cheatTitleInput,
      cheatContentInput,
      cheatSizeInput,
      addCheat,
      saveCheatsheet,
      cheatsheetHasSize,
      reduceSize,
      expandSize,
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
