<template>
  <q-card 
    class="cheat-card col"
    :class="cheatsheetHasSize(props.cheatData.size)" 
  >
    <q-card-actions align="right">
      <q-btn icon="more_horiz" flat>
        <q-menu anchor="bottom left" self="top start">
          <q-item clickable @click="editCheat">
            {{ $t("general.edit") }}
          </q-item>
        </q-menu>
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <h6 class="text-h6">
        {{ props.cheatData.title }}
      </h6>
    </q-card-section>
    <q-card-section>
      <MarkdownPreview :md="props.cheatData.content" />
    </q-card-section>
  </q-card>
</template>

<script>
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
  setup(props) {

    return {
      props,

      cheatsheetHasSize,
    }
  }
}
</script>
