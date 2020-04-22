<template>
  <div id="search-container">
    <label for="search-input">
      <input
        id="search-input"
        name="search-in-spotify"
        type="text"
        placeholder="Search in Spotify"
        @keydown.enter="search"
        v-model.trim="searchTerm"
      >
    </label>
    <button
      :aria-disabled="isLoading"
      aria-label="Search"
      class="btn btn-primary"
      :disabled="isLoading"
      @click="search"
      @keydown.enter.space="search"
    >
      Search
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      searchTerm: null,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.loading,
      lastSearchTerm: (state) => state.lastSearchTerm,
    }),
  },
  methods: {
    ...mapActions({
      searchFor: 'getSearchResults',
    }),
    search() {
      // avoid empty search and repeat the last one
      if ((this.searchTerm && this.searchTerm !== '') && this.searchTerm !== this.lastSearchTerm) {
        this.searchFor(this.searchTerm);
      }
    },
  },
};
</script>

<style>
#search-container {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

@media (min-width: 768px) {
  #search-container {
    margin-top: 50px;
  }
}

#search-input {
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-right: 15px;
  padding: 10px;
  width: 200px;
}

@media (min-width: 768px) {
  #search-input {
    width: 350px;
  }
}
</style>
