<template>
  <div id="results-container" v-if="searchResults">
    <p id="results-title" v-if="searchTerm">
      Showing results for <span class="search-term">{{ searchTerm }}</span>
    </p>
    <List :list="artists" type="artists">
      <ListItem
        :item="artist"
        :key="artist.id"
        v-for="artist in artists.items"
      ></ListItem>
    </List>
    <List :list="albums" type="albums">
      <ListItem
        :item="album"
        :key="album.id"
        v-for="album in albums.items"
      ></ListItem>
    </List>
    <List :list="tracks" type="tracks">
      <ListItem
        :item="track"
        :key="track.id"
        v-for="track in tracks.items"
      ></ListItem>
    </List>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import List from '@/components/Results/List.vue';
import ListItem from '@/components/Results/ListItem.vue';

export default {
  name: 'Results',
  components: {
    List,
    ListItem,
  },
  computed: {
    ...mapState({
      searchResults: (state) => state.searchResults,
      searchTerm: (state) => state.lastSearchTerm,
    }),
    albums() { return this.searchResults.albums; },
    artists() { return this.searchResults.artists; },
    tracks() { return this.searchResults.tracks; },
  },
};
</script>

<style>
#results-container {
  margin: 0 15px;
}

@media (min-width: 768px) {
  #results-container {
    margin: 0;
  }
}

#results-title {
  font-size: 1.2rem;
}

.search-term {
  font-style: italic;
  font-weight: bold;
}
</style>
