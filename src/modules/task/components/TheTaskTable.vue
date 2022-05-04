<template>
  <section class="d-flex flex-column">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Rand</th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="item in paginatedData"
        :key="item.id"
      >
        <th scope="row">{{item.id}}</th>
        <td>{{item.name}}</td>
        <td>{{item.rand}}</td>
      </tr>
      </tbody>
    </table>

    <p v-if="data.length === 0" class="mx-auto">
      Нет данных
    </p>

    <TablePagination
      :current-page="currentPage"
      :last-page="lastPage"
      @page-changed="currentPage = $event"
    />
  </section>
</template>

<script>
import TablePagination from './TheTaskTablePagination.vue';

export default {
  name: 'TheTaskTable',

  components: {
    TablePagination,
  },

  props: {
    settings: {
      type: Object,
      required: true,
    },

    data: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentPage: 1,
    };
  },

  watch: {
    'settings.perPage': function () {
      this.currentPage = 1;
    },
  },

  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.settings.perPage;

      return this.data.slice(start, start + this.settings.perPage);
    },

    lastPage() {
      return Math.ceil(this.data.length / this.settings.perPage);
    },
  },
};
</script>
