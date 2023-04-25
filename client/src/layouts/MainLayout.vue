<template>
  <q-layout view="lHh LpR lfr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <span v-if="userStore.isUserLogged">
          <q-btn flat icon="menu" @click="toggleLeftDrawer" />
        </span>
        <span v-else>
          <q-btn dense flat round icon="person" @click="appStore.openLoginDialog"/>
          <login-dialog isOpen="isLoginDialogOpen"/>
        </span>
        <q-separator vertical inset class="q-ml-sm"/>
        <q-toolbar-title>
          <router-link :to="{name: 'home'}" >
            <span 
              class="text-bold text-white" 
              style="text-decoration: none;"
            >
              /
            </span>
          </router-link>
        </q-toolbar-title>
        <q-btn :label="$t('mainLayout.compendiums')">
          <q-menu fit anchor="bottom left">
            <q-item clickable :to="{name: 'encyclopediaindex'}">
              <q-item-section>{{ $t('mainLayout.encyclopedia') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'cheatsheets'}">
              <q-item-section>{{ $t('mainLayout.cheatsheets') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'guideslistpage'}">
              <q-item-section>{{ $t('mainLayout.guides') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'essayslistpage'}">
              <q-item-section>{{ $t('mainLayout.essays') }}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
        <q-btn :label="$t('mainLayout.activities')">
          <q-menu fit anchor="bottom left">
            <q-item clickable :to="{name: 'researchListPage'}">
              <q-item-section>{{ $t('mainLayout.research') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'quizzesListPage'}">
              <q-item-section>{{ $t('mainLayout.quizzes') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'flashCardCollectionListPage'}">
              <q-item-section>{{ $t('mainLayout.flashcards') }}</q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'practiceRoutineListPage'}">
              <q-item-section>{{ $t('mainLayout.practice') }}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
        <q-btn :label="$t('mainLayout.resources')">
          <q-menu fit anchor="bottom left">
            <q-item clickable :to="{name: 'learningResourceListPage'}">
              <q-item-section>
                {{ $t('mainLayout.learnignResources') }}
              </q-item-section>
            </q-item>
            <q-item clickable :to="{name: 'imageResourceListPage'}">
              <q-item-section>
                {{ $t('mainLayout.images') }}
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>

        <q-btn flat icon="help_center" :to="{name: 'helpCenterPage'}"/>
        <q-btn flat icon="handyman" @click="toggleToolDrawer" />

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
          <q-expansion-item 
            :label="$t('mainDrawer.notes')" 
            icon="inbox"
            default-opened
            :content-inset-level="1"
          >
            <q-item clickable v-ripple :to="{name: 'noteListPage'}">
              <q-item-section avatar>
                <q-icon name="text_snippet" />
              </q-item-section>
              <q-item-section>
                {{ $t("mainDrawer.permanent") }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{name: 'fleetingNotesListPage'}">
              <q-item-section avatar>
                <q-icon name="bolt" />
              </q-item-section>
              <q-item-section>
                {{ $t("mainDrawer.fleeting") }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{name: 'literaryNoteListPage'}">
              <q-item-section avatar>
                <q-icon name="menu_book" />
              </q-item-section>
              <q-item-section>
                {{ $t("mainDrawer.literary") }}
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item clickable v-ripple :to="{name: 'tasks'}">
            <q-item-section avatar>
              <q-icon name="task_alt" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.tasks") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'learningResourceUserListPage'}">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.learningResources") }}
            </q-item-section>
          </q-item>

          <q-expansion-item
            :label="$t('mainDrawer.calendar')" 
            icon="calendar_month"
            default-opened
            :content-inset-level="1"
          >
            <q-item clickable v-ripple :to="{name: 'goalsListPage'}">
              <q-item-section avatar>
                <q-icon name="flag" />
              </q-item-section>
            
              <q-item-section>
                {{ $t("mainDrawer.goals") }}
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item clickable v-ripple :to="{name: 'tools'}">
            <q-item-section avatar>
              <q-icon name="handyman" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.tools") }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'practiceRoutineUserListPage'}">
            <q-item-section avatar>
              <q-icon name="fitness_center" />
            </q-item-section>

            <q-item-section>
              {{ $t("mainDrawer.practice") }}
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

    <!-- Tool drawer -->
    <q-drawer 
      v-model="isToolDrawerOpen" 
      side="right" 
      bordered
      mini
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list>
          <q-item 
            clickable 
            v-ripple
            @click="openFleetingNoteDialog"
          >
            <q-tooltip 
              :delay="500"
              anchor="center start" 
              self="center right"
            >
              {{ $t("toolDrawer.fleetingNote") }}
            </q-tooltip>
            <q-item-section avatar>
              <q-icon name="sticky_note_2" />
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-tooltip 
              :delay="500"
              anchor="center start" 
              self="center right"
            >
              {{ $t("toolDrawer.timer") }}
            </q-tooltip>
            <q-item-section avatar>
              <PomodoroTimer />
            </q-item-section>
          </q-item>
          <q-item v-ripple>
            <q-tooltip 
              :delay="500"
              anchor="center start" 
              self="center right"
            >
              {{ $t("toolDrawer.newImage") }}
            </q-tooltip>
            <q-item-section avatar>
              <UploadImageBtn />
            </q-item-section>
          </q-item>

          <q-item class="absolute-bottom">
            <q-item-section avatar>
              <QuoteBtn />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container id="page-container">
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from "src/stores/user-store"
import { useAppStore } from "src/stores/app-store"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"

import LoginDialog from "src/components/for-control/LoginDialog"
import FleetingNoteDialog from "src/components/for-control/FleetingNoteDialog"
import PomodoroTimer from 'src/components/for-control/PomodoroTimer'
import QuoteBtn from "src/components/for-input/QuoteBtn"
import UploadImageBtn from "src/components/for-input/UploadImageBtn"

export default {
  components: {
    LoginDialog,
    PomodoroTimer,
    QuoteBtn,
    UploadImageBtn,
  },
  setup() {
    const router = useRouter()
    const quasar = useQuasar()

    const isToolDrawerOpen = ref(false)
    const leftDrawerOpen = ref(false)
    const userStore = useUserStore()
    const appStore = useAppStore()

    function logOut() {
      userStore.logOutUser()
      leftDrawerOpen.value = false
      router.push({name: "home"})
    }
    function toggleToolDrawer() {
      isToolDrawerOpen.value = !isToolDrawerOpen.value
    }
    function openFleetingNoteDialog() {
      quasar.dialog({
        component: FleetingNoteDialog,
      })
    }

    return {
      userStore,
      appStore,
      leftDrawerOpen,
      isToolDrawerOpen,

      logOut,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      openFleetingNoteDialog,
      toggleToolDrawer,

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
