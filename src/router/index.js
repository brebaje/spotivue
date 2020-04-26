import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import StorageService from '../services/storage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
    },
  },
  {
    path: '*',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (notfound.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    meta: {
      public: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const isLoginView = to.matched.some((record) => record.name && record.name.toLowerCase() === 'login');
  const isLoggedIn = !!StorageService.getAccessToken();

  // not logged in
  if (!isPublic && !isLoggedIn) {
    // maintain hash from Spotify callback with accessToken in redirect to /login
    return next({ path: '/login', hash: to.hash });
  }

  // not allowed to visit login page if logged in already
  if (isLoggedIn && isLoginView) {
    return next(from ? from.path : '/');
  }

  // - public page (404)
  // - logged in and allowed to access route
  return next();
});

export default router;
