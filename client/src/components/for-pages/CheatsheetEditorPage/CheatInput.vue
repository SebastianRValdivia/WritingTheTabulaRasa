<template>
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
    <q-btn round flat icon="done" @click="emitDone"/>
  </q-card-actions>
</q-card>
</template>

<script>
import { ref } from "vue"
import { cheatsheetHasSize } from "src/utils/cheatsheets"

export default {
  name: "CheatInput",
  emits: ["onDone"],
  setup(props, ctx) {
    const cheatTitleInput = ref("") 
    const cheatContentInput = ref("")
    const cheatSizeInput = ref(2)


    function clearInputs() {
      cheatTitleInput.value = ""
      cheatContentInput.value = ""
      cheatSizeInput.value = 2
    }
    function emitDone() {
      if (cheatTitleInput.value && cheatContentInput.value) {
        let cheatData = {
          title: cheatTitleInput.value,
          content: cheatContentInput.value,
          size: cheatSizeInput.value,
        }
        ctx.emit("onDone", cheatData)
        clearInputs()
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
    return {
      cheatTitleInput,
      cheatContentInput,
      cheatSizeInput,

      cheatsheetHasSize,
      emitDone,
      expandSize,
      reduceSize,
    }
  }
}
</script>
