<template>
  <q-page padding>
    <q-list>
      <q-item 
        v-for="essayData in displayedEssays"
        :key="essayData.id" 
        v-ripple
        clickable
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
  </q-page>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useQuasar, useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useEssayStore } from "src/stores/essay-store"
import { useUserStore } from "src/stores/user-store"


export default {
  name: "EssaysListPage",
  setup() {
    const quasar = useQuasar()
    const { t } = useI18n()
    const essayStore = useEssayStore() 
    const userStore = useUserStore()

    const displayedEssays = ref()

    function getUsername(userId) {
      return userStore.getUsernameById(userId)
    }

    onBeforeMount(async () => {
      quasar.loading.show()
      let result = await essayStore.retrieveEssays()
      
      if (result) {
        displayedEssays.value = essayStore.getEssays
      }
      quasar.loading.hide()
    })

    useMeta({
      title: t("essaysListPage.pageTitle"),
    })

    return {
      displayedEssays,
      getUsername,
    }

  }
}
</script>
