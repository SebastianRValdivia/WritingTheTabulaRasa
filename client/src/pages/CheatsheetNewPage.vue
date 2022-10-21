<template>
  <q-page class="q-pa-md justify-center">
    <div class="row q-pb-xl">
      <q-input v-model="sheetTitleInput" input-class="text-h3"/>
      <q-space/>
      <q-btn :label="$t('done')" color="primary" @click="saveCheatsheet"/>
    </div>

    <div class="row">
      <q-card class="cheat-card" v-for="(cheat, index) in cheatList" :key="index">
        <q-card-section>
          {{ cheat.title }}
        </q-card-section>
        <q-card-section>
          <MarkdownPreview :md="cheat.content" />
        </q-card-section>
      </q-card>

      <q-card class="cheat-card">
        <q-card-section>
          <q-input v-model="cheatTitleInput"/>
        </q-card-section>
        <q-card-section>
          <q-input type="textarea" v-model="cheatContentInput"/>
        </q-card-section>
        <q-card-actions>
          <q-space/>
          <q-btn round icon="done" @click="addCheat"/>
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { ref } from "vue"

import { useCheatsheetStore } from "src/stores/cheatsheet-store"
import MarkdownPreview from "src/components/MarkdownPreview"

export default {
  components: {
    MarkdownPreview
  },
  setup() {
    const cheatsheetStore = useCheatsheetStore()

    const sheetTitleInput = ref("")
    const cheatList = ref([])
    const cheatTitleInput = ref("") 
    const cheatContentInput = ref("")

    function addCheat() {
      let newCheat = {
        title: null,
        content: null
      }
      newCheat.title = cheatTitleInput.value
      newCheat.content = cheatContentInput.value
      
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
            sheet: sheetCreated.id
          })
        })
      }


    }

    return {
      sheetTitleInput,
      cheatList,
      cheatTitleInput,
      cheatContentInput,
      addCheat,
      saveCheatsheet,
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