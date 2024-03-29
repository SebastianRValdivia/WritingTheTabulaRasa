<template>
  <q-page padding class="row">
    <div class="col col-10 row">
      <q-input 
        class="col col-12 self-center" 
        input-class="text-h2" 
        v-model="titleInput"
        :placeholder="$t('guideEditorPage.title')"
      />
      <q-page-sticky position="top-right" :offset="[20, 20]">
        <q-btn icon="done" round color="primary" @click="submitGuideAndSteps"/>
      </q-page-sticky>
      <q-input 
        autogrow 
        borderless 
        v-model="descriptionInput"
        class="col col-12"
        :placeholder="$t('guideEditorPage.description')"
      />
    </div>
    <ul
      class="col col-12 scoped-step"
      v-if="stepList.length > 0"
    >
      <li 
        v-for="(step, index) in stepList" 
        :key="index"
      >
        <div>
          <h4 class="text-h4">
            {{ step.order }} - {{ step.title }}
          </h4>
          {{ step.content }}
        </div>
      </li>
    </ul>
    <div class="col col-12 row">
      <q-card class="col-7 q-ml-xl">
        <q-card-section class="row">
          <q-input 
            v-model.number="stepOrderInput" 
            type="number"
            class="col-1 q-mr-md"
          />
          <q-input 
            class="col-8" 
            input-class="text-h4" 
            v-model="stepTitleInput"
            :placeholder="$t('guideEditorPage.stepTitle')"
          />
          <q-input 
            class="col-12" 
            v-model="stepContentInput"
            :placeholder="$t('guideEditorPage.stepContent')"
            autogrow
            borderless
          />
        </q-card-section>
      </q-card>
      <div class="col q-pl-xl self-center">
        <q-btn 
          icon="add" 
          @click="addStep"
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useMeta } from "quasar"
import { useI18n } from "vue-i18n"

import { useGuideStore } from "src/stores/guide-store"

export default {
  name: "GuideEditorPage",
  setup() {
    const guideStore = useGuideStore()
    const router = useRouter()
    const { t } = useI18n()

    const titleInput = ref("")
    const descriptionInput = ref("")
    const stepList = ref([])
    const stepTitleInput = ref("")
    const stepOrderInput = ref(1) // Initial value is 1
    const stepContentInput = ref("")

    function addStep() {
      // Arrange step data
      let stepData = {
        title: stepTitleInput.value,
        content: stepContentInput.value,
        order: stepOrderInput.value,
      }
      // Add step to stepList
      stepList.value.push(stepData)
      // Clear inputs
      stepTitleInput.value = ""
      stepContentInput.value = ""
      // Add 1 to step
      stepOrderInput.value += 1
    }
    async function submitGuideAndSteps() {
      let newGuideData = {
        title: titleInput.value,
        description: descriptionInput.value,
      }
      let newGuide = await guideStore.saveGuide(newGuideData)

      if (newGuide) {
        stepList.value.forEach(async (stepData) => {
          let guideField = {guide: newGuide.id}
          stepData = {...stepData, ...guideField}
          await guideStore.saveStep(stepData)
        })
        router.push({name: "guidePage", params: {url: newGuide.url}})
      }
    }

    useMeta({
      title: t("guideEditorPage.pageTitle"),
    })

    return {
      titleInput,
      descriptionInput,
      stepList,
      stepTitleInput,
      stepOrderInput,
      stepContentInput,
      addStep,
      submitGuideAndSteps,
    }

  }

}
</script>

<style lang="scss">
.scoped-step {
  list-style-type: none;
}
</style>
