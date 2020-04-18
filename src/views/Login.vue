<template>
  <div id="login-container">
    <h2>Please sign in with your Spotify account.</h2>
    <button class="btn btn-primary" @click="login">
      Sign in
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      popupReference: null,
      title: 'Sign if with your Spotify account',
      url: 'https://accounts.spotify.com/authorize',
    };
  },
  methods: {
    ...mapMutations({
      setUserLoggedIn: 'login',
    }),
    login() {
      this.$store.dispatch('goToSpotifyLogin');
    },
  },
  created() {
    // Implicit Grant Flow
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
    // if redirected from Spotify after user logged in, the access token will be present in the hash part of the url
    if (this.$route.hash) {
      const hashObject = this.$route.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
          if (item) {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      if (hashObject && hashObject.access_token) {
        // save token and redirect to home
        this.setUserLoggedIn(hashObject.access_token);
        this.$router.push('/');
      }
    }
  },
};
</script>

<style scoped>
#login-container {
  margin: 100px auto;
  max-width: 300px;
  text-align: center;
}
</style>
