<template>
  <button
    aria-label="Back to top button"
    id="back-to-top"
    class="btn btn-primary"
    @click="goTop"
    @keydown.enter.space="goTop"
  >
    <img
      alt="Back to top"
      src="../assets/arrow_top.svg"
      title="Back to top"
    >
  </button>
</template>

<script>
export default {
  name: 'BackToTop',
  methods: {
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    window.onscroll = () => {
      const pageOffset = document.documentElement.scrollTop || document.body.scrollTop;

      if (pageOffset >= 500) {
        document.getElementById('back-to-top').style.visibility = 'visible';
      }
      else {
        document.getElementById('back-to-top').style.visibility = 'hidden';
      }
    };
  },
};
</script>

<style scoped>
button {
  bottom: 75px;
  padding: 5px;
  position: fixed;
  right: 15px;
  visibility: hidden;
}

@media (min-width: 768px) {
  button {
    padding: 10px;
  }
}

img {
  height: 20px;
  width: 20px;
}
</style>
