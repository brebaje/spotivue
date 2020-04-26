<template>
  <transition name="fade">
    <div id="results-container" v-if="searchResults">
      <div id="results-container-actions">
        <p id="results-title" v-if="searchTerm">
          Showing results for <span class="search-term">{{ searchTerm }}</span>
        </p>
        <Filters></Filters>
      </div>
      <transition-group
        name="slide"
        v-on:before-leave="calcWidth"
        v-on:leave="addFixedWidth"
      >
        <List
          class="slide"
          key="artists"
          :amount="artists.items.length"
          :total="artists.total"
          type="artists"
          v-if="showArtists"
        >
          <ListItem
            :item="artist"
            :key="artist.id"
            v-for="artist in artists.items"
          ></ListItem>
          <LoadMore type="artists"></LoadMore>
        </List>
        <List
          class="slide"
          key="albums"
          :amount="albums.items.length"
          :total="albums.total"
          type="albums"
          v-if="showAlbums"
        >
          <ListItem
            :item="album"
            :key="album.id"
            v-for="album in albums.items"
          ></ListItem>
          <LoadMore type="albums"></LoadMore>
        </List>
        <List
          class="slide"
          key="tracks"
          :amount="tracks.items.length"
          :total="tracks.total"
          type="tracks"
          v-if="showTracks"
        >
          <ListItem
            :item="track"
            :key="track.id"
            v-for="track in tracks.items"
          ></ListItem>
          <LoadMore type="tracks"></LoadMore>
        </List>
        <div class="slide" key="none" id="results-no-filters" v-if="noFilters">
          <p>Search results are being filtered out</p>
          <p>Please select one or more filters</p>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import Filters from '@/components/Results/Filters.vue';
import List from '@/components/Results/List.vue';
import ListItem from '@/components/Results/ListItem.vue';
import LoadMore from '@/components/Results/LoadMore.vue';

export default {
  name: 'Results',
  data() {
    return {
      width: null,
    };
  },
  components: {
    Filters,
    List,
    ListItem,
    LoadMore,
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
  methods: {
    addFixedWidth() {
      // maintain same width as before for when it has position absolute during transition
      document.querySelector('.slide-leave-active').style.width = `${this.width}px`;
    },
    calcWidth() {
      this.width = document.querySelector('.slide').clientWidth;
    },
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
  margin: 0 0 15px;
}

@media (min-width: 768px) {
  #results-title {
    font-size: 1.2rem;
  }
}

.search-term {
  font-style: italic;
  font-weight: bold;
}

#results-no-filters {
  margin-top: 50px;
  text-align: center;
}

/* Animation for the whole results container */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Animation when applying filters */
.slide {
  transform-origin: top;
  transition: transform 0.7s ease-in-out;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease-in-out;
}

.slide-leave-active {
  position: absolute;
  /* width done dynamically */
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.slide-move {
  transition: all 0.7s ease-in-out;
}
</style>
