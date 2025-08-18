<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@/utils/useFetch.ts';
import type { User } from '@/interfaces/user.ts';

const route = useRoute()
const userId = route.params.id

const { data: user, error } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
)
</script>

<template>
  <p v-if="!user">Loading...</p>
  <p v-else-if="error">Failed to load data: {{ error.message }}</p>

  <div v-if="user" class="content">
    <h4>{{ user.name }}</h4>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
    <p>Website: {{ user.website }}</p>
  </div>
</template>

<style scoped>
.content {
  color: black;
  font-size: 20px;
}
</style>