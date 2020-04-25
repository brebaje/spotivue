<template>
  <div id="search-bar">
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
        href="#0"
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
      class="btn btn-primary text-shadow"
      :disabled="isLoading"
      @click="search"
      @keydown.enter.space="search"
    >
      Search
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Bar',
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
    ...mapMutations({
      addIfRemoved: 'updateRecentSearches',
    }),
    clearInput() {
      this.searchTerm = null;
    },
    search() {
      // avoid empty search
      // avoid repeating the current search
      if ((this.searchTerm && this.searchTerm !== '') && this.searchTerm !== this.lastSearchTerm) {
        this.searchFor(this.searchTerm);
      }
      // check if the user removed the last search from the recent searches array
      if (this.searchTerm === this.lastSearchTerm) {
        this.addIfRemoved(this.searchTerm);
      }
    },
  },
  watch: {
    lastSearchTerm() {
      this.searchTerm = this.lastSearchTerm;
    },
  },
};
</script>

<style scoped>
#search-bar {
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
