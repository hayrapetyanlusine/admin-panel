<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const searchText = ref(null);

function logOut() {
  localStorage.removeItem('token')
  router.push('/login')
}

</script>

<template>
  <div class="dashboard-wrapper">
    <Sidebar />

    <div class="dashboard-content">
      <div class="content-header">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="searchText" placeholder="Search" />
        </IconField>

        <Button type="button" @click="logOut()" icon="pi pi-sign-out" label="Log out" severity="secondary" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<style>
.dashboard-wrapper {
  display: flex;
  gap: 8px;
  width: 100%;
}
.dashboard-content {
  width: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.content-header {
  height: 70px;
  background: #fff;
  box-shadow: 0 1px 2px #786d78;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
}
.p-iconfield {
  width: 70%;
}
.p-inputtext {
  width: 100%;
}
</style>
