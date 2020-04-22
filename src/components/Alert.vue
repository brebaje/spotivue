<template>
  <div id="alert-container" v-if="error && showAlert">
    <span
      class="alert"
      :class="{ 'alert-danger': error }"
    >
      {{ message }}
      <a
        class="alert-close"
        href="#"
        title="Dismiss alert"
        @click.prevent="dismiss"
        @keydown.enter.space="dismiss"
      >
      X
    </a>
    </span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapState({
      error: (state) => state.error,
      message: (state) => state.errorMessage,
      showAlert: (state) => !state.alertDismissed,
    }),
  },
  methods: {
    ...mapMutations({
      dismiss: 'hideAlert',
    }),
  },
};
</script>

<style scoped>
#alert-container {
  margin: 15px;
}

.alert {
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 10px 30px;
}

.alert-danger {
  background-color: #da5673;
}

.alert-close {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
</style>
