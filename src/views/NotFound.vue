<template>
  <div id="not-found-container">
    <h2>404</h2>
    <p>Page not found</p>
    <button
      aria-label="Go to home page"
      class="btn btn-primary"
      @click="goHome"
      @keydown.enter.space="goHome"
    >Homepage</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped>
#not-found-container {
  margin: 100px auto;
  max-width: 300px;
  text-align: center;
}

h2 {
  color: #1DB954;
  font-size: 5rem;
  margin: 0;
}

p {
  margin: 10px 0 30px 0;
}

img {
  height: 40px;
  vertical-align: middle;
}
</style>
