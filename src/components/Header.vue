<template>
  <div id="header-container">
    <div id="header-row">
      <div id="logo-container">
        <router-link to="/">
          <h1 id="logo" class="code">SpotiVue</h1>
        </router-link>
      </div>
      <div id="header-actions" v-if="isUserLoggedIn">
        <button
          aria-label="Logout"
          id="logout"
          class="btn btn-danger text-shadow"
          @click="logout"
          @keydown.enter.space="logout"
        >
          Logout
        </button>
      </div>
    </div>
    <span id="username">Logged in as {{ username }}</span>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
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
#header-row {
  align-items: stretch;
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

#logo {
  background-color: #1DB954;
  border-radius: 0 0 4px 4px;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 10px 15px;
  text-shadow: 0 4px 3px rgba(0, 0, 0, 0.4), 0 8px 13px rgba(0, 0, 0, 0.1), 0 18px 23px rgba(0, 0, 0, 0.1);
}

#header-actions {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

#username {
  display: block;
  font-size: 0.8rem;
  margin-top: 5px;
  text-align: right;
}

#logout {
  margin-left: 15px;
  margin-top: 15px;
}
</style>
