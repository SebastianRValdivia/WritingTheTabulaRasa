<template>
  <q-page padding class="row">
    <div id="side-bar" class="col-2 column">
      <q-list>
        <q-item :to="{name: 'bookReaderPage'}">
          {{ $t("helpCenterPage.book") }}
        </q-item>
      </q-list>
    </div>

    <q-separator vertical color="primary"/>

    <q-page-container id="page-container">
      <router-view></router-view>
    </q-page-container>

  </q-page>
</template>

<script>

export default {
  name: "HelpCenterPage",
}
</script>
