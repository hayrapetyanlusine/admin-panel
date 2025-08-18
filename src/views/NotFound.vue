<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h1 class="not-found-title">Page not found</h1>

    <RouterLink to="/dashboard" class="not-found-button">
      Home
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  height: 100dvh;
}
.not-found-title {
  font-size: 32px;
  font-weight: bold;
}
.not-found-button {
  background: #e363ae;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  margin-top: 20px;
}
</style>