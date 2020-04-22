<template>
  <div id="footer-container">
    <div id="footer-info">
      <h4>Search in Spotify</h4>
      <p>made with Vue</p>
    </div>
    <div id="footer-links">
      <a
        href="https://github.com/brebaje/spotivue"
        target="_blank"
        title="Go to github repository"
      >
        <img
          alt="Github mark"
          src="../assets/github.png"
          title="Github repository"
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
#footer-container {
  align-items: center;
  background-color: #1DB954;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
}

@media (min-width: 768px) {
  #footer-container {
    border-radius: 4px 4px 0 0;
  }
}

#footer-info {
  font-weight: 200;
  margin-top: 5px;
}

h4 {
  font-weight: 700;
  margin: 0 10px 0 0;
}

p {
  font-size: 0.8rem;
  margin: 0;
}

a {
  display: block;
  height: 32px;
  width: 32px;
}
</style>
