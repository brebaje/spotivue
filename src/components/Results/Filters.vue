<template>
  <div id="results-filters-container" class="options">
    <div id="results-filters-desc">
      <p class="options-title">Filter by</p>
    </div>
    <div id="results-filters">
      <label for="artists-filter">
        <input
          id="artists-filter"
          type="checkbox"
          value="artists"
          v-model="filters"
        > Artists
      </label>
      <label for="albums-filter">
        <input
          id="albums-filter"
          type="checkbox"
          value="albums"
          v-model="filters"
        > Albums
      </label>
      <label for="tracks-filter">
        <input
          id="tracks-filter"
          type="checkbox"
          value="tracks"
          v-model="filters"
        > Tracks
      </label>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Filters',
  computed: {
    ...mapState({
      resultsFilters: (state) => state.resultsFilters,
    }),
    filters: {
      get() { return this.resultsFilters; },
      set(activeFilters) { this.setFilters(activeFilters); },
    },
  },
  methods: {
    ...mapMutations({
      setFilters: 'setResultsFilters',
    }),
  },
};
</script>

<style scoped>
#results-filters-container {
  justify-content: flex-start;
}

label {
  padding: 0 5px;
}
</style>
