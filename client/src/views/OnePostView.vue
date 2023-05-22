<script setup lang="ts">
import { deletePost, getPost, type PostData } from "@/http/postHttp";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/mainStore";
import EditPostModal from "@/components/modals/EditPostModal.vue";

const mainStore = useMainStore();

const route = useRoute();
const router = useRouter();
const post = ref<PostData>({} as PostData);
const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    const response = await getPost(route.params.id as string);
    post.value = response.data;
    isLoading.value = false;
  } catch (e) {
    console.log(e);
  }
});

const formatedDate = computed(() => {
  const date = new Date(post.value.date);
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formatted = formatter.format(date);
  return formatted;
});

const handleDelete = async () => {
  await deletePost(post.value.id);
  router.push("/");
};
</script>

<template>
  <div class="blogpost">
    <p v-if="!Object.keys(post).length">Loading...</p>
    <div
      class="no-post"
      v-else-if="isLoading"
    >
      <h1 class="no-post__title">Requested post not found</h1>
      <router-link
        to="/"
        class="no-post__link"
        >Home</router-link
      >
    </div>
    <div v-else>
      <h1 class="blogpost__title">{{ post.title }}</h1>
      <div
        class="blogpost__image"
        v-if="post.image"
      >
        <img
          :src="`https://blog-m0ye.onrender.com/${post.image.split('dist/')[1]}`"
          alt=""
          class="blogpost__img"
        />
      </div>
      <div class="blogpost__additional">
        <p class="blogpost__date">{{ formatedDate }}</p>
        <p class="blogpost__author">Auhtor: {{ post.author }}</p>
      </div>
      <div class="blogpost__text">{{ post.text }}</div>
      <div
        class="blogpost__btns"
        v-if="post.author === mainStore.user.username"
      >
        <button
          class="blogpost__btn"
          @click="mainStore.openEditModal"
        >
          Edit post
        </button>
        <button
          class="blogpost__btn"
          v-if="post.author === mainStore.user.username"
          @click="handleDelete"
        >
          Delete post
        </button>
      </div>
    </div>
    <EditPostModal :id="post.id" />
  </div>
</template>

<style scoped lang="scss">
.no-post {
  text-align: center;
  margin-top: 70px;
  &__title {
    font-size: 32px;
  }
  &__link {
    text-decoration: none;
    color: #3137c9;
    transition: 0.2s ease;
    &:hover {
      color: white;
    }
  }
}
.modal {
  background-color: rgba($color: #000000, $alpha: 0.3);
}
.blogpost {
  padding: 70px 200px;
  position: relative;
  &__title {
    font-size: 32px;
  }
  &__image {
    height: 400px;
    object-fit: contain;
  }
  &__additional {
    max-width: fit-content;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  &__date {
    margin-right: 30px;
    color: #5e5959;
  }
  &__text {
    margin-top: 75px;
    padding: 20px;
    border: 1px solid #333;
  }
  &__btns {
    display: flex;
    max-width: fit-content;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }
  &__btn {
    margin: 0 5px;
    padding: 7px 7px;
    font-size: 18px;
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
</style>
