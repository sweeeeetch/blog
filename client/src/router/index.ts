import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import { useMainStore } from "@/stores/mainStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useMainStore();
  if (to.name === "posts" && !(Object.keys(store.user).length > 0)) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
