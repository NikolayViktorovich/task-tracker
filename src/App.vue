<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth';
import Header from '@/components/Header.vue';

const authStore = useAuthStore();

onMounted(() => {
  const user = authService.checkAuth();
  if (user) {
    authStore.setUser(user);
  }
});
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>