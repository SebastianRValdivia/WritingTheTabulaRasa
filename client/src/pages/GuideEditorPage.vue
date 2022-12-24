<template>
  <q-page class="row q-pa-md">
    <div class="row">
      <q-input 
        class="col-8" 
        input-class="text-h2" 
        v-model="titleInput"
        :placeholder="$t('guideEditorPage.title')"
      />
      <q-page-sticky position="top-right" :offset="[20, 20]">
        <q-btn icon="save" round primary @click="submitGuideAndSteps"/>
      </q-page-sticky>
      <q-input 
        autogrow 
        borderless 
        v-model="descriptionInput"
        class="col-12"
        :placeholder="$t('guideEditorPage.description')"
      />
    </div>
    <ul class="col-12 step">
      <li v-for="(step, index) in stepsListInput" :key="index">
        <div>
          <h3 class="text-h3">
            {{ step.order }} -{{ step.title }}
          </h3>
          {{ step.content }}
        </div>
      </li>
    </ul>
    <q-card class="col-7 q-ml-xl">
      <q-card-section class="row">
        <q-input 
          v-model.number="stepOrderInput" 
          type="number"
          class="col-1 q-mr-md"
        />
        <q-input 
          class="col-8" 
          input-class="text-h3" 
          v-model="stepTitleInput"
          :placeholder="$t('guideEditorPage.stepTitle')"
        />
        <q-input 
          class="col-12" 
          v-model="stepContentInput"
          :placeholder="$t('guideEditorPage.stepContent')"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn icon="add" round @click="addStep"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"

import { useGuideStore } from "src/stores/guide-store"

export default {
  name: "GuideEditorPage",
  setup() {
    const guideStore = useGuideStore()
    const router = useRouter()

    const titleInput = ref("")
    const descriptionInput = ref("")
    const stepsListInput = ref([])
    const stepTitleInput = ref("")
    const stepOrderInput = ref("")
    const stepContentInput = ref("")

    function addStep() {
      let stepData = {
        title: stepTitleInput.value,
        content: stepContentInput.value,
        order: stepOrderInput.value,
      }
      stepsListInput.value.push(stepData)
    }
    async function submitGuideAndSteps() {
      let newGuideData = {
        title: titleInput.value,
        description: descriptionInput.value,
      }
      let newGuide = await guideStore.saveGuide(newGuideData)

      if (newGuide) {
        stepsListInput.value.forEach(async (stepData) => {
          let guideField = {guide: newGuide.id}
          stepData = {...stepData, ...guideField}
          await guideStore.saveStep(stepData)
        })
        router.push({name: "guidePage", params: {url: newGuide.url}})
      }
    }

    return {
      titleInput,
      descriptionInput,
      stepsListInput,
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
.step {
  list-style-type: none;
}
</style>
