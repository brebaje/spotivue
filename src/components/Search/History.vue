<template>
  <div id="search-history-container" class="options" v-if="recentSearches.length">
    <div id="search-history-desc">
      <p class="options-title">Recent searches</p>
    </div>
    <div id="search-history-terms">
      <div class="search-history-item-wrapper" :key="index" v-for="(term, index) in recentSearches">
        <a
          class="search-history-item text-shadow"
          href="#0"
          :key="`a${index}`"
          :title="searchAgainText(term)"
          @click="searchFor(term)"
          @keydown.enter.space="searchFor(term)"
        >
          {{ term }}
        </a>
        <a
          class="clear-search-history-item text-shadow"
          href="#0"
          :key="`b${index}`"
          :title="clearTermText(term)"
          @click="dismiss(term)"
          @keydown.enter.space="dismiss(term)"
        >
          X
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'History',
  computed: {
    ...mapState({
      lastSearchTerm: (state) => state.lastSearchTerm,
      recentSearches: (state) => state.lastSearches,
    }),
  },
  methods: {
    ...mapActions({
      getSearchResults: 'getSearchResults',
    }),
    ...mapMutations({
      dismiss: 'removeRecentSearch',
    }),
    clearTermText(term) {
      return `Dismiss recent search for ${term}`;
    },
    searchAgainText(term) {
      return `Search again for ${term}`;
    },
    searchFor(term) {
      if (term !== this.lastSearchTerm) {
        this.getSearchResults(term);
      }
    },
  },
};
</script>

<style scoped>
#search-history-container {
  margin-top: 15px;
}

#search-history-terms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.search-history-item-wrapper {
  margin: 5px 5px 0 5px;
}

a {
  display: inline-block;
}

.search-history-item {
  background-color: #1DB954;
  border-radius: 4px 0 0 4px;
  color: white;
  padding: 4px;
  text-decoration: none;
}

.clear-search-history-item {
  background-color: #1DB954;
  border-radius: 0 4px 4px 0;
  color: white;
  margin-left: -1px;
  padding: 4px 4px 4px 8px;
  text-decoration: none;
}
</style>
