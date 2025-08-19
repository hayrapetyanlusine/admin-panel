<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@/utils/useFetch.ts';
import type { User } from '@/interfaces/user.ts';

const route = useRoute()
const userId = route.params.id

const { data: user, error } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
</script>

<template>
  <p v-if="!user">Loading...</p>
  <p v-else-if="error">Failed to load data: {{ error.message }}</p>

  <div v-if="user" class="content">
    <RouterLink to="/dashboard" class="back">
      <i class="pi pi-home"></i>
      Back to Dashboard
    </RouterLink>

    <div class="content-info">
      <h4 class="user-name">{{ user.name }}</h4>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Website: {{ user.website }}</p>
    </div>
  </div>
</template>

<style scoped>
.content {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 18px;
}

.user-name {
  font-weight: bold;
  font-size: 20px;
}

.back {
  font-size: 15px;

  &:hover {
    color: black;
  }
}
</style>