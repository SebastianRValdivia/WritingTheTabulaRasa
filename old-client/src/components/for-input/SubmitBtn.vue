<template>
  <q-page-sticky
    position="top-right"
    :offset="[20, 20]"
  >
    <q-btn
      icon="done"
      round
      color="primary"
      :disable="!props.status" 
    />
  </q-page-sticky>
</template>

<script>
export default {
  name: "SubmitBtn",
  props: {
    status: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {

    return {
      props,
    }
  }
}
</script>
