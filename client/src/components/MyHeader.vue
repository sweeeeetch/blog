<script setup lang="ts">
import { logout, type IUser } from "@/http/authHttp";
import { useMainStore } from "@/stores/mainStore";
const mainStore = useMainStore();

const logOut = async () => {
  await logout();
  localStorage.removeItem("token");
  mainStore.setUser({} as IUser);
};
</script>

<template>
  <header class="header">
    <router-link
      to="/"
      class="header__title"
      >Blog</router-link
    >
    <div
      class="header__signed"
      v-if="Object.keys(mainStore.user).length > 0"
    >
      <router-link
        to="/posts"
        class="header__link"
        >My posts</router-link
      >
      <button
        class="header__login"
        @click="logOut"
      >
        Logout
      </button>
    </div>
    <div
      class="header__auth"
      v-else
    >
      <button
        class="header__login"
        @click="mainStore.openLoginModal"
      >
        Login
      </button>
      <button
        class="header__link"
        @click="mainStore.openRegisterModal"
      >
        Sign Up
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 50px;
  background: #0d0d0d;
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  &__title {
    font-size: 28px;
    color: white;
    text-decoration: none;
  }
  &__auth {
    width: 13%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__signed {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__login {
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
  &__link {
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;
    color: #3f45e9;
    font-size: 18px;
    transition: 0.1s ease-in all;
    text-decoration: none;
    &:hover {
      color: white;
    }
  }
}
</style>
