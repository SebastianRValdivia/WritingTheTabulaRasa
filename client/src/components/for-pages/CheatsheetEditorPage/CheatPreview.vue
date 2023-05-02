<template>
  <q-card 
    class="cheat-card col"
    :class="cheatsheetHasSize(cheatSizeInput)" 
  >
    <q-card-actions align="right">
      <q-btn icon="more_horiz" flat>
        <q-menu anchor="bottom left" self="top start">
          <q-item clickable @click="editCheat()">
            {{ $t("general.edit") }}
          </q-item>
        </q-menu>
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <h6 
        class="text-h6"
        v-if="!isEditing"
      >
        {{ props.cheatData.title }}
      </h6>
      <q-input
        v-else
        input-class="text-h6"
        v-model="newCheatTitleInput"
      />
    </q-card-section>
    <q-card-section>
      <MarkdownPreview v-if="!isEditing" :md="props.cheatData.content" />
      <q-input
        v-else
        type="textarea" 
        v-model="newCheatContentInput"
      />
    </q-card-section>
    <q-card-actions 
      class="absolute-bottom"
      align="right"
      v-if="isEditing"
    >
      <q-btn-group flat>
        <q-btn color="primary" flat icon="remove" @click="reduceSize()"/>
        <q-btn color="primary" flat icon="add" @click="expandSize()"/>
      </q-btn-group>
      <q-space/>
      <q-btn 
        flat
        icon="done"
        @click="emitUpdated"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

import { cheatsheetHasSize } from "src/utils/cheatsheets"

export default {
  name: "CheatPreview.vue",
  components: {
    MarkdownPreview,
  },
  props: {
    cheatData: {
      type: Object,
      required: true
    }
  },
  emits: ["onUpdated"],
  setup(props, ctx) {
    const isEditing = ref(false)
    const newCheatTitleInput = ref("")
    const newCheatContentInput = ref("")
    const cheatSizeInput = ref()

    function editCheat() {
      isEditing.value = true
    }
    function stopEditingCheat() {
      isEditing.value = false
    }
    function emitUpdated() {
      let updatedCheatData = {
        title:
          newCheatTitleInput.value ? newCheatTitleInput.value : cheatData.title,
        content:
          newCheatContentInput.value 
            ? newCheatContentInput.value 
            : cheatData.content,
        size: cheatSizeInput.value !== props.cheatData.size
          ? cheatSizeInput.value
          : props.cheatData.size
      }
      ctx.emit("onUpdated", props.cheatData.title, updatedCheatData)
      stopEditingCheat()
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

    onBeforeMount(() => {
      newCheatContentInput.value = props.cheatData.content
      newCheatTitleInput.value = props.cheatData.title
      cheatSizeInput.value = props.cheatData.size
    })

    return {
      props,

      isEditing,
      newCheatTitleInput,
      newCheatContentInput,
      cheatSizeInput,

      cheatsheetHasSize,
      editCheat,
      emitUpdated,
      reduceSize,
      expandSize,
    }
  }
}
</script>
