<template>
    {{ props.id }}
</template>

<script>
export default {
  name: "PracticeRoutinePage",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    return { props, }
  }
}
</script>
