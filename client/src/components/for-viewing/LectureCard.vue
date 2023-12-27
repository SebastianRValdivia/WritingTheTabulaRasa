<template>
  <q-card class="my-card">
  <q-img :src="props.thumbnail">
    <div class="absolute-bottom text-h6">
        {{ props.title }}
    </div>
  </q-img>
</q-card>
</template>

<script>

export default {
  name: "LectureCard",
  props: {
    title: String,
    description: String,
    thumbnail: String,
  },
  setup(props) {
    return {
      props
    }
  }
}

</script>
