<script setup lang="ts"></script>

<template>
  <main class="mine">
    <div class="mine__header">
      <h1 class="mine__title">Posts</h1>
      <button class="mine__btn">Add post</button>
    </div>
    <div class="posts"></div>
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
</style>
