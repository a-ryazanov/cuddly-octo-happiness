<template>
  <section class="container py-4">
    <TheTaskForm
      v-model="settings"
      @submit="generateDataset"
      @reset="resetDataset"
      class="mb-4"
    />

    <TheTaskChart
      :data="dataset"
      class="mb-4 w-25"
    />

    <TheTaskTable
      :data="dataset"
      :settings="settings"
    />
  </section>
</template>

<script>
import TheTaskChart from '../components/TheTaskChart.vue';
import TheTaskForm from '../components/TheTaskForm.vue';
import TheTaskTable from '../components/TheTaskTable.vue';

import { generateData } from '../data-generator';

const DEFAULT_SETTINGS = {
  total: 5,
  perPage: 5,
  words: 'apple,tomato,potato,orange',
};

export default {
  name: 'TheTaskMainPage',

  components: {
    TheTaskChart,
    TheTaskForm,
    TheTaskTable,
  },

  data() {
    return {
      settings: {
        ...DEFAULT_SETTINGS,
      },

      dataset: [],
      defaultDataset: [],
    };
  },

  computed: {
    arrayOfWords() {
      return this.settings.words.split(',');
    },
  },

  created() {
    this.generateDataset();
    this.defaultDataset = [...this.dataset];
  },

  methods: {
    generateDataset() {
      this.dataset = generateData(this.settings.total, this.arrayOfWords);
    },

    resetDataset() {
      this.dataset = this.defaultDataset;
      this.settings = {
        ...DEFAULT_SETTINGS,
      };
    },
  },
};
</script>

<style scoped>

</style>
