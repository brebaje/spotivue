<template>
  <div class="home">
    <Search></Search>
    <Results></Results>
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Results from '@/components/Results/Results.vue';
import Search from '@/components/Search/Search.vue';
import BackToTop from '@/components/BackToTop.vue';

export default {
  name: 'Home',
  components: {
    BackToTop,
    Results,
    Search,
  },
  computed: {
    ...mapState({
      searchResults: (state) => state.searchResults,
    }),
  },
};
</script>
