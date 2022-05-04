<template>
  <section class="d-flex align-self-center">
    <a
      v-if="isFirstPageShownOutsideNeighbors"
      @click="changePage(1)"
      class="mx-1 btn btn-outline-primary btn-sm"
      v-text="'1'"
    />

    <span
      v-if="firstPageInNeighborsRange > 2"
      v-text="'...'"
      class="mx-1"
    />

    <a
      v-for="page in currentPageNeighborsRange"
      :key="page"
      class="mx-1 btn btn-outline-primary btn-sm"
      :class="{ 'active': page === currentPage }"
      @click="changePage(page)"
      v-text="page"
    />

    <span
      v-if="lastPageInNeighborsRange < (lastPage - 1)"
      v-text="'...'"
      class="mx-1"
    />

    <a
      v-if="isLastPageShownOutsideNeighbors"
      @click="changePage(lastPage)"
      v-text="lastPage"
      class="mx-1 btn btn-outline-primary btn-sm"
    />
  </section>
</template>

<script>
const NEIGHBORS_OF_CURRENT_PAGE = 1;

export default {
  name: 'TheTaskTablePagination',

  props: {
    currentPage: {
      type: Number,
      required: true,
    },

    lastPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    currentPageNeighborsRange() {
      const length = this.lastPageInNeighborsRange - this.firstPageInNeighborsRange + 1;

      return Array.from({ length }, (v, i) => i + this.firstPageInNeighborsRange);
    },

    firstPageInNeighborsRange() {
      return Math.max(1, this.currentPage - NEIGHBORS_OF_CURRENT_PAGE);
    },

    lastPageInNeighborsRange() {
      return Math.min(
        this.lastPage,
        this.currentPage + NEIGHBORS_OF_CURRENT_PAGE,
      );
    },

    isFirstPageShownOutsideNeighbors() {
      return this.firstPageInNeighborsRange !== 1;
    },

    isLastPageShownOutsideNeighbors() {
      return this.lastPageInNeighborsRange !== this.lastPage;
    },
  },

  methods: {
    changePage(page) {
      if (page !== this.currentPage) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style scoped>

</style>
