<script setup lang="ts">
import { deletePost, type PostData } from "@/http/postHttp";
import { computed, ref } from "vue";
import EditPostModal from "@/components/modals/EditPostModal.vue";
import { useMainStore } from "@/stores/mainStore";
const mainStore = useMainStore();

const emit = defineEmits(["update"]);

interface PostProp {
  post: PostData;
  editButton?: boolean;
}
const textLength = ref(0);

const props = defineProps<PostProp>();

const previewText = computed(() => {
  const sentences = props.post.text.split(".");
  const previewSentences = sentences.slice(0, 2);
  textLength.value = previewSentences.join(" ").length;
  if (textLength.value > 410) {
    return `${previewSentences[0]}.`;
  } else {
    return previewSentences.join(". ") + ".";
  }
});

console.log(props.post.image);

const formatedDate = computed(() => {
  const date = new Date(props.post.date);
  const formatter = new Intl.DateTimeFormat("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formatted = formatter.format(date);
  return formatted;
});

const handleDelete = async () => {
  await deletePost(props.post.id);
  emit("update");
};
</script>

<template>
  <div class="wrapper">
    <div class="post">
      <div
        class="post__image"
        v-if="post.image"
      >
        <img
          :src="`https://blog-api-85me.onrender.com${post.image.split('static')[1]}`"
          :alt="`${post.title} image`"
        />
      </div>
      <div class="post__data">
        <h3 class="post__title">{{ post.title }}</h3>
        <p class="post__preview">{{ previewText }}</p>
        <div class="post__additional">
          <div class="post__info">
            <p class="post__date">{{ formatedDate }}</p>
            <p class="post__author">Author: {{ post.author }}</p>
          </div>
          <div class="post__btns">
            <button
              class="post__btn"
              v-if="post.author === mainStore.user.username"
              @click="mainStore.openEditModal"
            >
              Edit post
            </button>
            <button
              class="post__btn"
              v-if="post.author === mainStore.user.username"
              @click="handleDelete"
            >
              Delete post
            </button>
            <router-link
              :to="`/post/${props.post.id}`"
              class="post__link"
              v-if="post.text.length > 410"
              >Read full</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <EditPostModal
      :id="post.id"
      @change="emit('update')"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.post {
  max-height: max-content;
  margin: 20px 0;
  width: 100%;
  background-color: #efefef;
  border: 2px solid rgba(34, 60, 80, 0.3);
  box-shadow: 11px 9px 20px 0px rgb(34 60 80 / 20%);
  &__data {
    padding: 25px;
  }
  &__title {
    text-shadow: 3px 3px 1px #bfecf7;
  }
  &__image img {
    width: 100%;
    object-fit: cover;
    height: 200px;
  }
  &__preview {
    margin-top: 60px;
  }
  &__additional {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  &__info {
    align-items: center;
    max-width: fit-content;
    display: flex;
    justify-content: space-between;
  }
  &__date {
    margin-right: 20px;
    color: #858585;
  }
  &__btns {
    max-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__link {
    font-size: 18px;
    color: #3137c9;
    text-decoration: none;
    transition: 0.2s ease;
    &:hover {
      color: rgb(156, 156, 156);
    }
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
