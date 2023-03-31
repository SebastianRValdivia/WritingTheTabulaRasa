<template>
  <div class="cards-container" @click="pushToActivity">
    <q-card 
      class="card card-1 column items-center"
    >
      <q-card-section>
        {{ flashCardList[0].hint }}
      </q-card-section>
    </q-card>
    <q-card 
      v-if="flashCardList.length > 1"
      class="card card-2 column items-center"
    >
      <q-card-section>
        {{ flashCardList[1].hint }}
      </q-card-section>
    </q-card>
    <q-card 
      v-if="flashCardList.length > 2"
      class="card card-3 column items-center"
    >
      <q-card-section>
        {{ flashCardList[2].hint }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import { useQuizzStore } from "src/stores/quizz-store"

export default {
  name: "CardDeck",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const quizzStore = useQuizzStore()

    const flashCardList = ref([])

    function pushToActivity() {
      router.push({name: "flashCardCollectionPage", params: {id: props.id}})
    }

    onBeforeMount(() => {
      flashCardList.value = quizzStore.getFlashCardsByCollectionId(Number(props.id))
    })


    return {
      props,
      flashCardList,

      pushToActivity,
    }
  }
}
</script>

<style scoped>
.card {
  min-height: 15rem;
  min-width: 20rem;
  max-height: 15rem;
  max-width: 20rem;
  position: absolute;
}
.card:hover {
  z-index: 999;
}
.card-1 {
  z-index: 10;
}
.card-2 {
  z-index: 9;
  margin-left: 1rem;
}
.card-3 {
  z-index: 8;
  margin-left: 2rem;
}
</style>


