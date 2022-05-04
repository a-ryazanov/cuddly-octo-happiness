<template>
  <div id="app">
    <TheTaskMainPage />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { TheTaskMainPage } from './modules/task';

export default Vue.extend({
  name: 'App',
  components: {
    TheTaskMainPage,
  },
});
</script>

<style>
</style>
