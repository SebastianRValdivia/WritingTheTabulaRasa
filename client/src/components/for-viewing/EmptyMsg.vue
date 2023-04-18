<template>
  <div class="column items-center">
    <h3 class="text-h3" v-if="props.msg">
      {{ props.msg }}
    </h3>
    <h3 class="text-h3" v-else>
      {{ $t("general.empty") }}
    </h3>
  </div>
</template>

<script>

export default {
  name: "EmptyMsg",
  props: {
    msg: {
      type: String
    }
  },
  setup(props) {
    return {
      props
    }
  }
}
</script>
