<template>
  <q-card
    :class="cheatsheetHasSize(cheatData.size)"
  >
    <div
      :style="{ 'background-color': computedCardColor}"
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
import { computed } from "vue"

import { cheatsheetHasSize } from "src/utils/cheatsheets"
import MarkdownPreview from "src/components/for-viewing/MarkdownPreview.vue"

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

    const computedCardColor = computed(() => {
      if (props.color && /^#{1}/.test(props.color)) {
        return props.color
      } else {
        return "#"+props.color
      }
    })

    return {
      props,
      computedCardColor,

      cheatsheetHasSize,
    }
  }
}
</script>
