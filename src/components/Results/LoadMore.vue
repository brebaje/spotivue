<template>
  <div class="load-more" v-if="showSelf">
    <a
      href="#0"
      :title="`Show more ${type}`"
      @click="loadMore"
      @keydown.enter.space="loadMore"
    >
      Show more
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoadMore',
  props: ['type'],
  computed: {
    ...mapState({
      data: (state) => state.searchResults,
    }),
    showSelf() {
      return this.data[this.type].next;
    },
  },
  methods: {
    ...mapActions({
      getNextSearchResults: 'getNextSearchResults',
    }),
    loadMore() {
      this.getNextSearchResults({ url: this.data[this.type].next, type: this.type });
    },
  },
};
</script>

<style scoped>
.load-more {
  align-self: center;
  padding: 20px;
  text-align: center;
}

a {
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
