<template>
  <div id="results-container" v-if="searchResults">
    <div id="results-container-actions">
      <p id="results-title" v-if="searchTerm">
        Showing results for <span class="search-term">{{ searchTerm }}</span>
      </p>
      <Filters></Filters>
    </div>
    <List :list="artists" type="artists" v-show="showArtists">
      <ListItem
        :item="artist"
        :key="artist.id"
        v-for="artist in artists.items"
      ></ListItem>
    </List>
    <List :list="albums" type="albums" v-show="showAlbums">
      <ListItem
        :item="album"
        :key="album.id"
        v-for="album in albums.items"
      ></ListItem>
    </List>
    <List :list="tracks" type="tracks" v-show="showTracks">
      <ListItem
        :item="track"
        :key="track.id"
        v-for="track in tracks.items"
      ></ListItem>
    </List>
    <div id="results-no-filters" v-if="noFilters">
      <p>Search results are being filtered out</p>
      <p>Please select one or more filters</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import List from '@/components/Results/List.vue';
import ListItem from '@/components/Results/ListItem.vue';
import Filters from '@/components/Results/Filters.vue';

export default {
  name: 'Results',
  components: {
    Filters,
    List,
    ListItem,
  },
  computed: {
    ...mapState({
      activeResultsFilters: (state) => state.resultsFilters,
      searchResults: (state) => state.searchResults,
      searchTerm: (state) => state.lastSearchTerm,
    }),
    albums() { return this.searchResults.albums; },
    artists() { return this.searchResults.artists; },
    noFilters() {
      return !this.showAlbums && !this.showArtists && !this.showTracks;
    },
    tracks() { return this.searchResults.tracks; },
    showAlbums() { return this.activeResultsFilters.includes('albums'); },
    showArtists() { return this.activeResultsFilters.includes('artists'); },
    showTracks() { return this.activeResultsFilters.includes('tracks'); },
  },
};
</script>

<style scoped>
#results-container {
  margin: 35px 0 0;
}

@media (min-width: 768px) {
  #results-container {
    margin: 50px 0 0;
  }
}

#results-container-actions {
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#results-title {
  font-size: 1.2rem;
  margin: 0 0 15px;
}

.search-term {
  font-style: italic;
  font-weight: bold;
}

#results-no-filters {
  margin-top: 50px;
  text-align: center;
}
</style>
