<template>
  <div id="app">
    <Header v-if="user && currentRoute !== 'login'" />
    <main class="main-content">
      <Home v-if="currentRoute === 'home' && user" />
      <Login v-else-if="currentRoute === 'login' || !user" />
      <Profile v-else-if="currentRoute === 'profile' && user" />
      <div v-else class="not-found">
        <h2>Страница не найдена</h2>
        <button @click="navigate('/')" class="btn btn-primary">На главную</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, computed } from 'vue';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth';
import { router } from '@/utils/router';
import Header from '@/components/Header.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';

const authStore = useAuthStore();
const currentRoute = ref(router.getCurrentRoute());
const user = computed(() => authStore.user);

provide('navigate', router.navigate);
provide('currentPath', () => router.getCurrentPath());

onMounted(() => {
  const savedUser = authService.checkAuth();
  if (savedUser) {
    authStore.setUser(savedUser);
    if (currentRoute.value === 'login') {
      router.navigate('/');
    }
  } else {
    if (currentRoute.value !== 'login') {
      router.navigate('/login');
    }
  }

  router.onRouteChange((route, path) => {
    console.log('Route changed to:', route, path);
    currentRoute.value = route;
    
    const currentUser = authService.checkAuth();
    if (!currentUser && route !== 'login') {
      router.navigate('/login');
      return;
    }
    
    if (currentUser && route === 'login') {
      router.navigate('/');
      return;
    }
  });
});

const navigate = router.navigate;
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

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

.not-found h2 {
  color: var(--gray-300);
  margin-bottom: 20px;
}
</style>