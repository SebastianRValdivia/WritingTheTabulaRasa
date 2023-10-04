<template>
  <q-page padding>
    <SearchInput @search="searchEssays"/>
    <q-list>
      <q-item
        v-for="essayData in displayedEssays"
        :key="essayData.id"
        v-ripple
        clickable
        :to="{name: 'essayPage', params: {url: essayData.url}}"
      >
        <q-item-section>
          <q-item-label overline> #{{ essayData.id }}</q-item-label>
          <q-item-label class="text-h4"> {{ essayData.title }}</q-item-label>
          <q-item-label>
            {{$t("essaysListPage.by")}}: {{getUsername(essayData.owner)}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky
      v-if="userStore.isUserLogged"
      position="top-right"
      :offset="[20, 20]"
    >
      <q-btn
        round
        color="primary"
        icon="add"
        size="md"
        :to="{name: 'essayEditorPage' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useEssayStore } from "src/stores/essay-store"
import { useUserStore } from "src/stores/user-store"
import SearchInput from "src/components/for-input/SearchInput.vue"
import { fuzzySearchByObjectByKeys } from "src/utils/search"


export default {
  name: "EssaysListPage",
  components: {
    SearchInput
  },
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const essayStore = useEssayStore()
    const userStore = useUserStore()

    const searchInput = ref("")
    const displayedEssays = computed(() => {
      if (searchInput.value) {
        return fuzzySearchByObjectByKeys(
          essayStore.getEssaysList,
          searchInput.value,
          ["title"]
        )
      } else return essayStore.getEssaysList
    })

    function getUsername(userId) {
      return userStore.getUsernameById(userId)
    }
    function searchEssays(searchPattern) {
      searchInput.value = searchPattern
    }

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await essayStore.retrieveEssays()

      if (result) {
        quasar.loading.hide()
      }
    })

    useMeta({
      title: t("essaysListPage.pageTitle"),
    })

    return {
      userStore,

      displayedEssays,
      getUsername,

      searchEssays,
    }

  }
}
</script>
