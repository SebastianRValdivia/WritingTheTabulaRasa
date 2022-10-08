<template>
  <q-card class="text-center note-card-desktop gt-md" >
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.content"/>
    </q-card-section>
  </q-card>

  <q-card class="text-center note-card-mobile lt-md q-ml-xl" >
    <q-card-section class="text-h6 row">
      <span class="text-bold">{{ props.identifier }}:</span> <span>{{props.title}}</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <MarkdownPreview :md="props.content"/>
    </q-card-section>
  </q-card>
</template>

<script>
import MarkdownPreview from "src/components/MarkdownPreview"
export default {
  name: "NoteCard",
  props: {
    identifier: String,
    title: String,
    content: String
  },
  components: {
    MarkdownPreview,
  },
  setup(props) {

    return {
      props,
    }
  }
}
</script>

<style>
.note-card-desktop {
  min-width: 50rem;
  min-height: 35rem;
}
.note-card-mobile {
  min-width: 20rem;
  min-height: 25rem;
}
</style>