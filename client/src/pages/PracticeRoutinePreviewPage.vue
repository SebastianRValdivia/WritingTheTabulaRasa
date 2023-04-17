<template>
  <q-page padding>
    {{ props.id }}
  </q-page>
</template>

<script>

export default {
  name: "PracticeRoutinePreviewPage",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    
    return {
      props
    }
  }
}
</script>
