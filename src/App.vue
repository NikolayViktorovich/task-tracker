<template>
  <div id="app">
    <Header v-if="user && $route.name !== 'login'" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth';
import Header from '@/components/Header.vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const user = computed(() => authStore.user);

onMounted(() => {
  const savedUser = authService.checkAuth();
  if (savedUser) {
    authStore.setUser(savedUser);
    if (route.name === 'login') {
      router.push('/');
    }
  } else {
    if (route.name !== 'login') {
      router.push('/login');
    }
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