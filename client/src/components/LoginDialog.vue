<template>
  <q-dialog v-model="appStore.isLoginOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
     </q-card>
  </q-dialog>

</template>

<script>
import { ref } from 'vue'
import { useAppStore } from "src/stores/app-store"

export default {
  setup() {
    const appStore = useAppStore()

    return {
      appStore,
    }
  }
}
</script>

<style>

    
</style>