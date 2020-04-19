<template>
  <div id="app">
    <Header></Header>
    <Alert></Alert>
    <router-view/>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Alert,
    Header,
  },
};
</script>
