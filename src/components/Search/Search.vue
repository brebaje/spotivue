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
      <a
        class="input-clear"
        :class="{ hidden: !this.searchTerm }"
        href="#"
        title="Clear search"
        @click.prevent="clearInput"
        @keydown.space.enter="clearInput"
      >
        X
      </a>
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
    clearInput() {
      this.searchTerm = null;
    },
    search() {
      // avoid empty search and repeat the last one
      if ((this.searchTerm && this.searchTerm !== '') && this.searchTerm !== this.lastSearchTerm) {
        this.searchFor(this.searchTerm);
      }
    },
  },
};
</script>

<style scoped>
#search-container {
  align-items: center;
  display: flex;
  justify-content: center;
}

#search-input {
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  padding: 10px 30px 10px 10px;
  width: 175px;
}

@media (min-width: 768px) {
  #search-input {
    width: 325px;
  }
}

.input-clear {
  color: black;
  font-weight: bold;
  margin: 0 15px 0 -25px;
  opacity: 0.7;
  padding: 10px 10px 10px 0;
  text-decoration: none;
}

.hidden {
  visibility: hidden;
}
</style>
