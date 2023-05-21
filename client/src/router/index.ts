import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PostsView from "@/views/PostsView.vue";
import OnePostView from "@/views/OnePostView.vue";
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
    {
      path: "/post/:id",
      name: "post",
      component: OnePostView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useMainStore();
  if (to.name === "posts" && !Object.keys(store.user).length) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
