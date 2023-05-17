<template>
  <q-item class="bg-transparent">
    <q-item-section side>
      <q-avatar rounded size="56px" class="q-ma-xm">
        <q-img src="~assets/no-avatar.svg"/>
        <q-badge floating color="red" v-if="userIsStaff">
          {{ $t("userBadge.professor") }}
        </q-badge>
        <q-badge floating color="green" v-else>
          {{ $t("userBadge.student") }}
        </q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ userName }}</q-item-label>
      <q-item-label caption># {{ userId }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { ref, onBeforeMount } from "vue"

import { useUserStore } from "src/stores/user-store"

export default {
  name: "UserBadge",
  props: {
    loggedUser: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Number,
    },
  },
  setup(props) {
    const userStore = useUserStore()

    const userName = ref("")
    const userId = ref(null)
    const userIsStaff = ref(null)


    onBeforeMount(async () => {
      if (props.loggedUser) {
        userName.value = userStore.getUserName
        userId.value = userStore.getUserId
        userIsStaff.value = userStore.getUserData.is_staff
      } else if (props.user) {
        let userData = userStore.getUserDataById(props.user)
        if (userData === undefined) {
          await userStore.retrieveUserDataById(props.user)
          userData = userStore.getUserDataById(props.user)
        }
        userName.value = userData.username
        userId.value = userData.pk
        userIsStaff.value = userData.is_staff
      }

    })
    return {
      props,
      userName,
      userId,
      userIsStaff
    }
  }
}
</script>
