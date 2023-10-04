<template>
  <q-page-sticky 
    v-if="userStore.isUserLogged"
    position="top-right"
    :offset="[20, 20]"
  >
    <q-btn 
      round 
      icon="add"
      color="primary"
      :to="props.to"
    />
  </q-page-sticky>
</template>

<script>
import { useUserStore } from "src/stores/user-store"

export default {
  name: "AddNewBtn",
  props: {
    to: {
      required: false
    }
  },
  setup(props) {
    const userStore = useUserStore()

    return {
      props,
      userStore,
    }

  }
}

</script>
