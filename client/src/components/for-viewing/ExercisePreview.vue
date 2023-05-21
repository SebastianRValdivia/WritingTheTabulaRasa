<template>
  <div class="row justify-center">
    <p class="col col-12 text-h5">
      {{ props.exerciseData.title }}
    </p>
  </div>
</template>

<script>

export default {
  name: "ExercisePreview",
  props: {
    exerciseData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    
    return {
      props
    }
  }

}
</script>
