<template>
  <div class="list-item">
    <img :src="image" :alt="altText" :title="altText">
    <p v-html="displayName"></p>
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
    displayName() {
      return this.truncate(this.item.name, 50);
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
  methods: {
    truncate(text, max) {
      if (text.length > max) {
        const subString = text.substr(0, max - 2);
        return `${subString.substr(0, subString.lastIndexOf(' '))} &hellip;`;
      }

      return text;
    },
  },
};
</script>

<style scoped>
img {
  height: auto;
  width: 100%;
}

p {
  font-size: 0.8rem;
}
</style>
