<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useQuasar } from "quasar"
import { onBeforeMount } from "vue"

import { useUserStore } from "src/stores/user-store"

export default ({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const userStore = useUserStore()

    function restoreUserCredentials() {
      userStore.saveUserCredentials(
        $q.cookies.get("username"),
        Number($q.cookies.get("userId")),
        $q.cookies.get("token"),
      )
    }

    onBeforeMount(() => {
      if ($q.cookies.has("token")) {
        restoreUserCredentials()
      }
    })

  }

})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,700;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400&display=swap');
#app {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
