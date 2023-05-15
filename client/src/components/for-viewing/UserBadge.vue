<template>
  <q-item class="bg-transparent">
    <q-item-section side>
      <q-avatar rounded size="56px" class="q-ma-xm">
        <q-img src="~assets/no-avatar.svg"/>
        <q-badge floating color="red" v-if="userStore.getUserData.is_staff">
          {{ $t("userBadge.professor") }}
        </q-badge>
        <q-badge floating color="green" v-else>
          {{ $t("userBadge.student") }}
        </q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section
      v-if="props.loggedUser" 
    >
      <q-item-label>{{ userStore.getUserName }}</q-item-label>
      <q-item-label caption># {{ userStore.getUserId }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { onBeforeMount } from "vue"

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

    onBeforeMount(async () => {
      
    })
    return {
      props,
      userStore
    }
  }
}
</script>
