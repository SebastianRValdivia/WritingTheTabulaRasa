<template>
  <q-layout view="lHh LpR lfr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <span v-if="userStore.isUserLogged">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        </span>
        <span v-else>
          <q-btn dense flat round icon="person" @click="appStore.openLoginDialog"/>
          <login-dialog isOpen="isLoginDialogOpen"/>
        </span>

        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/logo.svg">
          </q-avatar>
          Writing the tabula rasa
        </q-toolbar-title>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-grey-3"
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area class="fit links-area">
        <q-list>
          <router-link :to="{name: 'notes'}">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                {{ $t("mainDrawer.notes") }}
              </q-item-section>
            </q-item>
          </router-link>

          <router-link :to="{name: 'tools'}">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="plumbing" />
              </q-item-section>

              <q-item-section>
                {{ $t("mainDrawer.tools") }}
              </q-item-section>
            </q-item>
          </router-link>


        </q-list>

      </q-scroll-area>
      <q-img class="absolute-top" src="~assets/drawer-img.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/no-avatar.svg">
          </q-avatar>
          <div class="text-weight-bold">{{ userStore.getUsername }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"

import LoginDialog from "src/components/LoginDialog.vue"

export default {
  components: {
    LoginDialog
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const userStore = useUserStore()
    const appStore = useAppStore()

    return {
      userStore,
      appStore,

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
    }
  }
}
</script>

<style>
.links-area { 
  height: calc(100% - 150px);
  margin-top: 150px;
  border-right: 1px solid #ddd
}
</style>