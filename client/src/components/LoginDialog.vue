<template>
  <q-dialog v-model="appStore.isLoginOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">


        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="warning" v-close-popup />
          <q-btn flat label="accept" color="primary" @click="logIn" />
        </q-card-actions>
     </q-card>
  </q-dialog>

</template>

<script>
import { useAppStore } from "src/stores/app-store"
import { useUserStore } from "src/stores/user-store"

export default {
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    return {
      appStore,

      logIn() {
        userStore.logUser()
      },
    }
  }
}
</script>

<style>

    
</style>