<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { register } from "@/http/authHttp";
const mainStore = useMainStore();

const email = ref("");
const username = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    const response = await register(email.value, username.value, password.value);
    localStorage.setItem("token", response.data.accessToken);
    mainStore.setUser(response.data.user);
    mainStore.closeRegisterModal();
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const changeModal = () => {
  mainStore.closeRegisterModal();
  mainStore.openLoginModal();
};
</script>

<template>
  <div
    class="modal"
    v-if="mainStore.isRegisterModalOpen"
  >
    <div class="modal__wrapper">
      <span
        @click="mainStore.closeRegisterModal"
        class="modal__close"
        >X</span
      >
      <h3 class="modal__title">Register</h3>
      <form
        @submit.prevent="handleSubmit"
        class="modal__form"
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          v-model="email"
          class="modal__input"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          v-model="username"
          class="modal__input"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          class="modal__input"
        />

        <button
          type="submit"
          class="modal__button"
        >
          Register
        </button>
      </form>
      <p class="modal__text">
        Already registered?
        <span
          class="modal__action"
          @click="changeModal"
          >Login</span
        >
      </p>
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
