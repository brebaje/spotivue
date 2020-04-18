<template>
  <div id="header-container">
    <div id="logo-container">
      <router-link to="/">
        <h1 id="logo" class="code">SpotiVue</h1>
      </router-link>
      <div id="desc">
        <h4>Search on Spotify</h4>
        <p>made with Vue</p>
      </div>
    </div>
    <div id="header-actions" v-if="isUserLoggedIn">
      <span id="username">{{ username }}</span>
      <button
        id="logout"
        class="btn btn-danger"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isUserLoggedIn: (state) => state.loggedIn,
      user: (state) => state.user,
    }),
    username() {
      return this.user ? this.user.display_name : '';
    },
  },
  methods: {
    ...mapActions({
      getUserData: 'getUser',
    }),
    ...mapMutations({
      logoutUser: 'logout',
    }),
    logout() {
      this.logoutUser();
      this.$router.push('/login');
    },
  },
  mounted() {
    // get user data if not set
    if (this.isUserLoggedIn && !this.user) {
      this.getUserData();
    }
  },
};
</script>

<style scoped>
#header-container {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
}

@media (min-width: 768px) {
  #header-container {
    margin: 0;
  }
}

#logo-container {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
}

#logo {
  background-color: #1DB954;
  border-radius: 0 0 4px 4px;
  color: white;
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 10px 0 0;
  padding: 10px 15px;
}

#desc {
  font-weight: 200;
  margin-top: 5px;
}

h4 {
  font-weight: 400;
  margin: 0 10px 0 0;
}

p {
  font-size: 0.8rem;
  margin: 0;
}

#header-actions {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

#username {
  display: block;
  margin-top: 5px;
}

#logout {
  margin-left: 15px;
  margin-top: 15px;
}
</style>
