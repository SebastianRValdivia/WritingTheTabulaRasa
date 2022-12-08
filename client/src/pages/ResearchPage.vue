<template>
  <q-page>
    {{ props.id }}
  </q-page>
</template>

<script>
export default {
  name: "ResearchPage",
  props: {
    id: String
  },
  setup(props) {

    return {
      props
    }
  }
}
</script>
