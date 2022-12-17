<template>
  <q-page>
    {{ props.url }}
  </q-page>
</template>

<script>

export default {
  name: "GuidePage",
  props: {
    url: String
  },
  setup(props) {

    return {
      props
    }
  }
}
</script>
