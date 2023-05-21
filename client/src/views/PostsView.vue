<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { type PostData, getMyPosts } from "@/http/postHttp";
import { useMainStore } from "@/stores/mainStore";
import Post from "@/components/Post.vue";
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

const fetchData = async () => {
  try {
    const response = await getMyPosts(activePage.value);
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
  <main class="mine">
    <div class="mine__header">
      <h1 class="mine__title">My Posts</h1>
      <button
        class="mine__btn"
        @click="mainStore.openCreateModal"
      >
        Add post
      </button>
    </div>
    <div
      class="posts"
      v-if="posts.length"
    >
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :edit-button="true"
        @update="fetchData"
      />
    </div>
    <div
      class="no-posts"
      v-else
    >
      <h2 class="no-posts__title">You don't have any posts</h2>
      <p class="no-posts__text">Want to share your thoughts?</p>
      <button
        class="no-posts__button"
        @click="mainStore.openCreateModal"
      >
        Create post
      </button>
    </div>
    <div
      class="pagination"
      v-if="posts.length"
    >
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
.mine {
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
.no-posts {
  text-align: center;
  margin-top: 100px;
  &__title {
    font-size: 32px;
  }
  &__text {
    margin-top: 30px;
    font-size: 22px;
  }
  &__button {
    width: 250px;
    padding: 10px 0;
    margin-top: 40px;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease;
    color: #3137c9;
    background-color: white;
    border: 1px solid #3137c9;
    &:hover {
      color: white;
      background-color: #3137c9;
    }
  }
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
