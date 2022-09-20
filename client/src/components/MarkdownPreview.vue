<template>
  <div v-html="html"></div>
</template>

<script>
import MarkdownIt from "markdown-it"
import { ref, onBeforeMount, onBeforeUpdate } from "vue"

export default {
  props: {
    md: String
  },
  setup(props) {
    const markdownIt = new MarkdownIt()
    const html = ref("")

    function render() {
      if (props.md) {
        html.value = markdownIt.render(props.md)
      }
    }

    onBeforeMount(() => {
      render()
    })
    onBeforeUpdate(() => {
      render()
    })

    return {
      html,
    }



  }

}
</script>

<style>

</style>