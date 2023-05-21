import type { IUser } from "@/http/authHttp";
import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    user: {} as IUser,
    isRegisterModalOpen: false,
    isLoginModalOpen: false,
    isCreateModalOpen: false,
    isEditModalOpen: false,
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    openLoginModal() {
      this.isLoginModalOpen = true;
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    openRegisterModal() {
      this.isRegisterModalOpen = true;
    },
    closeRegisterModal() {
      this.isRegisterModalOpen = false;
    },
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    openEditModal() {
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
  },
});
