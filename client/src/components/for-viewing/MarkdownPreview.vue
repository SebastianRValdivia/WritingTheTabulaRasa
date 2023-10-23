<template>
  <div v-html="html"></div>
  <q-markdown :src="props.md">

  </q-markdown>
</template>

<script>
import { ref, onBeforeMount, onBeforeUpdate } from "vue"

export default {
  props: {
    md: String
  },
  setup(props) {

    return {
      props,
    }



  }

}
</script>

<style>

</style>
