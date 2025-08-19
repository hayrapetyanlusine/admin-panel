<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useFetch } from '@/utils/useFetch.ts';
import type { Post } from '@/interfaces/post.ts';

const { data, error } = useFetch<Post[]>(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
</script>

<template>
  <p v-if="!data">Loading...</p>
  <p v-else-if="error">Failed to load data: {{ error.message }}</p>
  <DataTable v-else :value="data">
    <Column header="#" headerStyle="width:3rem">
      <template #body="slotProps">
        {{ slotProps.index + 1 }}
      </template>
    </Column>
    <Column field="title" header="Title"></Column>
    <Column field="body" header="Body"></Column>
  </DataTable>
</template>