<template>
  <q-card
    class="col-2 scoped-resource-card"
  >
    <q-card-section>
      <div class="text-subtitle1">
        {{ props.title }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name:"LearningResourceCard",
  props: {
    title: {
      type: String,
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
<style scoped>
.scoped-resource-card {
  max-width: 200px;
  min-height: 300px;
}
</style>
