<script setup lang="ts">
import { ref } from 'vue';

const expended = ref(false);

function toggle() {
  expended.value = !expended.value;
}
</script>

<template>
  <div :class="['sidebar-container', { 'expanded': expended }]">
    <div class="sidebar-header">
      <h2 :class="['sidebar-title', { 'expanded': expended }]">Admin panel</h2>
      <i
        style="cursor: pointer"
        :class="['pi', expended ? 'pi-chevron-circle-left' : 'pi-chevron-circle-right']"
        @click="toggle"
      ></i>
    </div>
    <aside class="sidebar-content">
      <router-link
        to="/dashboard/users"
        class="sidebar-link"
        active-class="active-link"
      >
        <i class="pi pi-home"></i>
        Users
      </router-link>

      <router-link
        to="/dashboard/posts"
        class="sidebar-link"
        active-class="active-link"
      >
        <i class="pi pi-inbox"></i>
        Posts
      </router-link>
    </aside>
  </div>
</template>


<style scoped>
.sidebar-container {
  background: #fff;
  inline-size: 250px;
  height: 100dvh;
  box-shadow: 0 1px 2px #786d78;
  transition: width 0.25s ease-in-out;
}

.sidebar-container.expanded {
  inline-size: 130px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 5px;
}

.sidebar-title {
  color: #B2548A;
  font-weight: bold;
  white-space: nowrap;
}

.sidebar-title.expanded {
  font-size: 14px;
}

.sidebar-link {
  font-size: 18px;
  color: #5E555E;
  border-radius: 6px;
}

.sidebar-link i.pi {
  font-size: 18px;
}

.sidebar-link:hover {
  background-color: rgba(147, 85, 122, 0.1);
}

.active-link {
  background: rgba(147, 85, 122, 0.1);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
}
</style>