<script setup lang="ts">
import { onBeforeMount } from "vue";
import axios from "axios";
import { RouterView } from "vue-router";
import type { AuthResponse } from "./http/authHttp";
import { useMainStore } from "@/stores/mainStore";
import MyHeader from "./components/MyHeader.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import RegisterModal from "@/components/modals/RegisterModal.vue";

const mainStore = useMainStore();

onBeforeMount(async () => {
  try {
    if (!!localStorage.getItem("token")) {
      const response = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_APP_HOST_URL}user/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      mainStore.setUser(response.data.user);
      mainStore.closeLoginModal();
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <MyHeader />
  <div>
    <RouterView />
    <LoginModal />
    <RegisterModal />
  </div>
</template>

<style>
body {
  background-color: #e4e4e4;
}
</style>
