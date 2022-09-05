<template>
  <div>
    <h1>{{ props.id }}</h1>
  </div>
</template>

<script>

export default {
  props: {
    id: Number
  },
  setup(props) {

    return {
      props
    }

    
  }
}

</script>
