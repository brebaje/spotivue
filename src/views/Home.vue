<template>
  <div class="home">
    <Search></Search>
    <Results></Results>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Results from '@/components/Results/Results.vue';
import Search from '@/components/Search/Search.vue';

export default {
  name: 'Home',
  components: {
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
