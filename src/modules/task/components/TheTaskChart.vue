<template>
  <section class="d-flex align-items-start">
    <component
      :is="chartComponent"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />

    <button
      :aria-pressed="isPieChartShown"
      :class="{
        active: isPieChartShown
      }"
      class="btn btn-primary ms-3"
      type="button"
      data-toggle="button"
      autocomplete="off"
      @click="isPieChartShown = !isPieChartShown"
    >
      {{ isPieChartShown ? 'Круговая' : 'Столбчатая' }}
    </button>
  </section>
</template>

<script>
import { Pie, Bar } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement);

export default {
  name: 'TheTaskChart',

  components: {
    Pie,
    Bar,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isPieChartShown: true,
    };
  },

  computed: {
    eachWordCount() {
      return this.data.reduce((acc, item) => {
        acc[item.rand] = acc[item.rand] !== undefined ? acc[item.rand] + 1 : 1;

        return acc;
      }, {});
    },

    chartData() {
      return {
        labels: Object.keys(this.eachWordCount),
        datasets: [{
          data: Object.values(this.eachWordCount),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#2461FF',
            '#00FFD1',
            '#8373E4',
            '#FF1E54',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#2461FF',
            '#00FFD1',
            '#8373E4',
            '#FF1E54',
          ],
        }],
      };
    },

    chartOptions() {
      return {
        plugins: {
          legend: {
            display: this.isPieChartShown,
          },
        },
      };
    },

    chartComponent() {
      return this.isPieChartShown ? Pie : Bar;
    },
  },
};
</script>
