<template>
  <q-item class="bg-transparent">
    <q-avatar rounded size="56px" class="q-ma-xm">
      <q-img src="~assets/no-avatar.svg"/>
    </q-avatar>
    <div 
      v-if="props.loggedUser" 
      class="q-pl-sm text-weight-bolder"
    >
        {{ userStore.getUsername }}
        # {{ userStore.getUserId }}
    </div>
  </q-item>
</template>

<script>

import { useUserStore } from "src/stores/user-store"

export default {
  name: "UserBadge",
  props: {
    loggedUser: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const userStore = useUserStore()
    return {
      props,
      userStore
    }
  }
}
</script>
