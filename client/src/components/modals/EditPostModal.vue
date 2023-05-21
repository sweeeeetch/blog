<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { editPost } from "@/http/postHttp";
const mainStore = useMainStore();

const emit = defineEmits(["change"]);
const props = defineProps<{ id: string }>();

const title = ref("");
const text = ref("");

const handleSubmit = async () => {
  try {
    await editPost(props.id, {
      title: title.value,
      text: text.value,
    });
    mainStore.closeEditModal();
    emit("change");
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div
    class="modal"
    v-if="mainStore.isEditModalOpen"
  >
    <div class="modal__wrapper">
      <span
        @click="mainStore.closeEditModal"
        class="modal__close"
        >X</span
      >
      <h3 class="modal__title">Edit post</h3>
      <form
        @submit.prevent="handleSubmit"
        class="modal__form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          v-model="title"
          class="modal__input"
        />
        <textarea
          rows="15"
          cols="10"
          type="text"
          name="text"
          placeholder="Text"
          v-model="text"
          class="modal__input"
        />
        <button
          type="submit"
          class="modal__button"
        >
          Edit post
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
  background-color: rgba(0, 0, 0, 0.02);
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
}
</style>
