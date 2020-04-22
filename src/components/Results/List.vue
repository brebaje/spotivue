<template>
  <div class="results-list">
    <p class="results-list-title">
      {{ titleAmount }} <span class="sub-info">{{ titleMatches }}</span>
    </p>
    <div class="list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: { type: Object, required: true },
    type: { type: String, required: true },
  },
  computed: {
    amount() {
      return this.list.items ? this.list.items.length : 0;
    },
    titleAmount() {
      if (this.amount) {
        if (this.total && this.total > 10) {
          return `Top ${this.amount} ${this.type}`;
        }

        return `${this.amount} ${this.type}`;
      }

      return `No ${this.type} found`;
    },
    titleMatches() {
      if (this.total && this.total > 10) {
        return ` (${this.total} matches)`;
      }

      return '';
    },
    total() {
      return this.list.total ? this.list.total : 0;
    },
  },
};
</script>

<style scoped>
.results-list {
  padding: 5px 0;
}

.list {
  align-items: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1rem;
}

@media (min-width: 768px) {
  .list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

.results-list-title {
  border-top: 2px solid #1DB954;
  font-weight: bold;
  padding-top: 5px;
  text-transform: uppercase;
}

.sub-info {
  font-size: 0.8rem;
  font-weight: normal;
  text-transform: none;
}
</style>
