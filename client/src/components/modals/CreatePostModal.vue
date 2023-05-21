<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { createPost } from "@/http/postHttp";
const mainStore = useMainStore();

const title = ref("");
const text = ref("");
const author = ref(mainStore.user.username);
const userId = ref(mainStore.user.id);
const image = ref<File | null>();

const handleSubmit = async () => {
  try {
    await createPost({
      title: title.value,
      text: text.value,
      author: author.value,
      userId: userId.value,
      image: image.value ? image.value : undefined,
    });
    mainStore.closeCreateModal();
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    image.value = target.files[0];
  }
};
</script>

<template>
  <div
    class="modal"
    v-if="mainStore.isCreateModalOpen"
  >
    <div class="modal__wrapper">
      <span
        @click="mainStore.closeCreateModal"
        class="modal__close"
        >X</span
      >
      <h3 class="modal__title">Create post</h3>
      <form
        @submit.prevent="handleSubmit"
        class="modal__form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          v-model="title"
          required
          class="modal__input"
        />
        <textarea
          rows="15"
          required
          cols="10"
          type="text"
          name="text"
          placeholder="Text"
          v-model="text"
          class="modal__input"
        />
        <input
          type="file"
          @change="handleFileChange"
        />
        <input
          type="hidden"
          v-model="author"
        />
        <input
          type="hidden"
          v-model="userId"
        />
        <button
          type="submit"
          class="modal__button"
        >
          Create post
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  &__wrapper {
    background-color: #fff;
    border-radius: 20px;
    width: 540px;
    min-height: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
  }
  &__close {
    position: absolute;
    top: 13px;
    right: 20px;
    font-size: 22px;
    cursor: pointer;
  }
  &__title {
    margin-top: 60px;
    font-size: 26px;
  }
  &__form {
    margin-top: 50px;
  }
  &__input {
    width: 100%;
    padding: 20px 15px;
    font-size: 16px;
    border: 1px solid lightslategrey;
    border-radius: 4px;
    margin: 10px 0;
  }
  &__button {
    width: 100%;
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
  &__text {
    margin-top: 20px;
    color: rgb(131, 131, 131);
    text-align: center;
  }
  &__action {
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
}
</style>
