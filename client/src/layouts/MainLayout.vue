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
        <q-separator vertical inset class="q-ml-sm"/>
        <q-toolbar-title>
          <router-link :to="{name: 'home'}">
            <q-img id="logo" src="~/assets/logo.svg" fit/>
          </router-link>
        </q-toolbar-title>
        <q-btn :label="$t('mainLayout.compendiums')">
          <q-menu fit anchor="bottom left">
            <q-item clickable :to="{name: 'encyclopediaIndex'}">
              <q-item-section>{{ $t('mainLayout.encyclopedia') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'cheatsheets'}">
              <q-item-section>{{ $t('mainLayout.cheatsheets') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'guidesListPage'}">
              <q-item-section>{{ $t('mainLayout.guides') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'essaysListPage'}">
              <q-item-section>{{ $t('mainLayout.essays') }}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
        <q-btn :label="$t('mainLayout.activities')">
          <q-menu fit anchor="bottom left">
            <q-item clickable :to="{name: 'researchListPage'}">
              <q-item-section>{{ $t('mainLayout.research') }}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>

        <PomodoroTimer />

      </q-toolbar>

      <q-tabs align="left" v-if="appStore.isTabsOpen">
        <q-route-tab 
          v-for="(pathName, title, index) in appStore.getTabs" 
          :key="index" 
          :to="{name: pathName}" 
          :label="title"
          class="text-secondary"
        />
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
          <q-item clickable v-ripple :to="{name: 'notes'}">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.notes") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'tasks'}">
            <q-item-section avatar>
              <q-icon name="task_alt" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.tasks") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'schedules'}">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.calendar") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'tools'}">
            <q-item-section avatar>
              <q-icon name="handyman" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.tools") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'preferences'}">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.preferences") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logOut">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.logOut") }}
            </q-item-section>
          </q-item>
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

    <q-page-container id="page-container">
      <router-view></router-view>

      <q-page-sticky
        v-if="appStore.getIsNewNoteOpen"
        position="bottom-right"
        :offset="[10, 10]"
      >
        <NewNote />
      </q-page-sticky>

    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import { useRouter } from "vue-router"

import LoginDialog from "src/components/for-control/LoginDialog"
import PomodoroTimer from 'src/components/for-control/PomodoroTimer';
import NewNote from "src/components/for-control/NewNote"

export default {
  components: {
    LoginDialog,
    PomodoroTimer,
    NewNote
  },
  setup() {
    const router = useRouter()

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const userStore = useUserStore()
    const appStore = useAppStore()

    function logOut() {
      userStore.logOutUser()
      leftDrawerOpen.value = false
      router.push({name: "home"})
    }

    return {
      userStore,
      appStore,
      logOut,

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
#page-container {
  margin-left: 0.75rem;
  margin-top: 0.25rem;
  margin-right: 0.15rem;
}
#logo {
  max-height: 62px;
  max-width: 62px;
}
</style>
