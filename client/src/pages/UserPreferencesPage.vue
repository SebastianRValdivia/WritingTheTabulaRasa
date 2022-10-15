<template>
 {{ userStore.getUserPreferences }}
</template>

<script>
import { useUserStore } from "src/stores/user-store"

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
    }

  }
}
</script>