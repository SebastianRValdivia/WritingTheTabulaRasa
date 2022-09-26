<template>
  <div v-html="html"></div>
</template>

<script>
import { ref, onBeforeMount, onBeforeUpdate } from "vue"

import markdown from "src/utils/markdown"

export default {
  props: {
    md: String
  },
  setup(props) {
    const html = ref("")


    function render(contentToRender) {
      if (contentToRender) {
        html.value = markdown.render(contentToRender)
      }
    }

    onBeforeMount(() => {
      render(props.md)
    })
    onBeforeUpdate(() => {
      render(props.md)
    })

    return {
      html,
    }



  }

}
</script>

<style>

</style>