<script setup lang="ts">
import type { PostData } from "@/http/postHttp";
import { computed } from "vue";

interface PostProp {
  post: PostData;
}

const props = defineProps<PostProp>();

const previewText = computed(() => {
  const sentences = props.post.text.split(".");
  const previewSentences = sentences.slice(0, 2);
  if (previewSentences.join(" ").length > 410) {
    return `${previewSentences[0]}.`;
  } else {
    return previewSentences.join(". ") + ".";
  }
});

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
</script>

<template>
  <div class="post">
    <div
      class="post__image"
      v-if="post.image"
    >
      <img
        :src="post.image"
        :alt="`${post.title} image`"
      />
    </div>
    <div class="post__data">
      <h3 class="post__title">{{ post.title }}</h3>
      <p class="post__preview">{{ previewText }}</p>
      <div class="post__additional">
        <div>
          <p class="post__date">{{ formatedDate }}</p>
          <p class="post__author">Author: {{ post.author }}</p>
        </div>
        <router-link :to="`/post/${props.post.id}`">Read</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post {
  max-height: max-content;
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
  &__preview {
    margin-top: 60px;
  }
  &__additional {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__date {
    color: #858585;
  }
}
</style>
