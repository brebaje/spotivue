<template>
  <div id="app">
    <header>
      <Header></Header>
      <Alert></Alert>
    </header>
    <div id="main-content">
      <router-view/>
    </div>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Alert,
    Footer,
    Header,
  },
};
</script>

<style scoped>
#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
}

#main-content {
  margin: 25px 0;
}

@media (min-width: 768px) {
  #main-content {
    margin: 50px 0;
  }
}
</style>
