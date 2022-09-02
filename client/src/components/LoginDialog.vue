<template>
  <q-dialog v-model="appStore.isLoginOpen" persistent @keyup.enter="submit">
      <q-card class="q-px-sm q-pb-md column">
        <q-card-section class="items-center">
          <q-input v-model="username" filled class="app-login-input">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input 
            class="app-login-input"
            v-model="password"
            filled 
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" >
          <q-btn flat label="Cancel" color="warning" v-close-popup />
          <q-btn flat label="Proceed" color="primary" @click="submit" />
        </q-card-actions>
     </q-card>
  </q-dialog>

</template>

<script>
import { ref } from "vue"
import { useAppStore } from "src/stores/app-store"
import { useUserStore } from "src/stores/user-store"

export default {
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const username = ref("")
    const password = ref("")
    const isPwd = ref(true)

    return {
      appStore,
      username,
      password,
      isPwd,

      submit() {
        userStore.logUser(
          username.value,
          password.value
        )
      },
    }
  }
}
</script>

<style scoped>
.app-login-input {
  padding-bottom: 10px;
}

</style>