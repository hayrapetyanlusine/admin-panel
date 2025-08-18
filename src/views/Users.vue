<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useFetch } from '@/utils/useFetch.ts'
import type { User } from '@/interfaces/user.ts';

const { data, error } = useFetch<User[]>(`https://jsonplaceholder.typicode.com/users`)

function editUser(user: User) {
  console.log("edited user", user)
}

function deleteUser(user: User) {
  console.log("delete user", user)
}
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
    <Column field="name" header="Name"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="address.city" header="City"></Column>
    <Column header="Actions">
      <template #body="slotProps">
        <button @click="editUser(slotProps.data)" class="p-button p-button-text p-button-sm">
          ✏️
        </button>
        <button @click="deleteUser(slotProps.data)" class="p-button p-button-text p-button-sm text-red-500">
          🗑️
        </button>
      </template>
    </Column>
  </DataTable>
</template>
