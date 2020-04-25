<template>
  <div id="search-container">
    <Bar></Bar>
    <History></History>
  </div>
</template>

<script>
import Bar from '@/components/Search/Bar.vue';
import History from '@/components/Search/History.vue';

export default {
  name: 'Search',
  components: {
    Bar,
    History,
  },
};
</script>
