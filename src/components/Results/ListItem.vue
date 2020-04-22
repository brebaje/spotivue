<template>
  <div class="list-item">
    <img :src="image" :alt="altText" :title="altText">
    <p>{{ item.name }}</p>
  </div>
</template>

<script>
import noImageSVG from '../../assets/no_image.svg';

export default {
  name: 'ListItem',
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    altText() {
      return `Picture of ${this.item.name}`;
    },
    image() {
      if (this.item.images) {
        // artist or album image
        return this.item.images.length ? this.item.images[0].url : noImageSVG;
      }

      // get track image from the album
      return this.item.album ? this.item.album.images[0].url : noImageSVG;
    },
  },
};
</script>

<style scoped>
.list-item {
  align-self: baseline;
}

img {
  height: auto;
  width: 100%;
}
</style>
