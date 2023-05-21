<script setup lang="ts">
import Post from "@/components/Post.vue";
import { getPosts, type PostData } from "@/http/postHttp";
import { onBeforeMount, ref } from "vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const posts = ref<PostData[]>([]);
const activePage = ref(1);
const totalPages = ref(0);

onBeforeMount(() => {
  try {
    fetchData();
  } catch (e) {
    console.log(e);
  }
});

const openCreateModal = () => {
  if (Object.keys(mainStore.user).length) {
    mainStore.openCreateModal();
  } else {
    mainStore.openLoginModal();
  }
};

const fetchData = async () => {
  try {
    const response = await getPosts(activePage.value);
    posts.value = response.data.posts;
    totalPages.value = response.data.totalPages;
  } catch (e) {
    console.log(e);
  }
};

const previousPage = () => {
  if (activePage.value > 1) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activePage.value--;
    fetchData();
  }
};
const nextPage = () => {
  if (activePage.value < totalPages.value) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activePage.value++;
    fetchData();
  }
};
</script>

<template>
  <main class="main">
    <div class="main__header">
      <h1 class="main__title">Posts</h1>
      <button
        class="main__btn"
        @click="openCreateModal"
      >
        Add post
      </button>
    </div>
    <div class="posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @update="fetchData"
      />
    </div>
    <div class="pagination">
      <button
        @click="previousPage"
        :disabled="activePage === 1"
        class="pagination__button"
      >
        Previous
      </button>
      <span class="pagination__text">{{ activePage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="activePage === totalPages"
        class="pagination__button"
      >
        Next
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding: 50px 200px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__btn {
    padding: 8px 20px;
    font-size: 20px;
    background: #3137c9;
    border-radius: 25px;
    outline: none;
    border: none;
    color: white;
    transition: 0.1s ease-in all;
    cursor: pointer;
    &:hover {
      border-radius: 5px;
    }
  }
}
.posts {
  margin-top: 40px;
}

.pagination {
  margin-top: 70px;
  &__button {
    padding: 7px 7px;
    margin: 0 10px;
    border: 1px solid #3137c9;
    color: #3137c9;
    background-color: transparent;
    transition: 0.2s ease;
    border-radius: 12px;
    &:hover {
      background-color: #3137c9;
      color: white;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
    &:disabled {
      color: rgba(49, 54, 201, 0.5);
      border-color: rgba(49, 54, 201, 0.5);
      &:hover {
        color: #3137c9;
        border-color: #3137c9;
        background-color: transparent;
      }
      cursor: not-allowed;
    }
  }
}
</style>
