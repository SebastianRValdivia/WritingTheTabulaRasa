<template>
  <q-card
    :class="cheatsheetHasSize(cheatData.size)"
  >
    <div 
      :style="{ 'background-color': '#'+props.color}"
    >
      <q-card-section class="text-h5 text-weight-bolder">
          {{ props.cheatData.title }}
      </q-card-section>
    </div>
    <q-card-section>
      <div>
        <MarkdownPreview :md="props.cheatData.content" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { cheatsheetHasSize } from "src/utils/cheatsheets"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview"

export default {
  name: "CheatCard",
  props: {
    cheatData: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: false
    }
  },
  components: {
    MarkdownPreview
  },
  setup(props) {

    return {
      props,

      cheatsheetHasSize,
    }
  }
}
</script>
