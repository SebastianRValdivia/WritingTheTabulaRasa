<template>
  <div class="cards-container" @click="pushToActivity">
    <q-card class="card card-1">
      <span>#{{ props.id }}</span>
      <q-card-section>
        <h5>
          {{ props.title }}
        </h5>
      </q-card-section>
    </q-card>
    <q-card class="card card-2">
    </q-card>
    <q-card class="card card-3">
    </q-card>
  </div>
</template>

<script>
import { useRouter } from "vue-router"

export default {
  name: "CardDeck",
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    function pushToActivity() {
      router.push({name: "flashCardCollectionPage", params: {id: props.id}})
    }


    return {
      props,
      pushToActivity,
    }
  }
}
</script>

<style scoped>
.card {
  min-height: 15rem;
  min-width: 20rem;
  position: absolute;
}
.card-1 {
  z-index: 10;
}
.card-2 {
  z-index: 9;
  margin-left: 5rem;
}
.card-3 {
  z-index: 8;
  margin-left: 10rem;
}
.cards-container {
  padding: 10rem;
}
</style>


