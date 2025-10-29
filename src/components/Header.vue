<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/" class="logo-link" @click="closeMenu">
            <div class="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
                <path d="M12 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M9 13H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M9 17H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <span class="logo-text">TaskTracker</span>
          </router-link>
        </div>

        <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
          <router-link 
            to="/" 
            class="nav-link" 
            :class="{ active: $route.name === 'home' }"
            @click="closeMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="nav-icon">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/>
              <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2"/>
            </svg>
            Задачи
          </router-link>
          
          <router-link 
            to="/profile" 
            class="nav-link" 
            :class="{ active: $route.name === 'profile' }"
            @click="closeMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="nav-icon">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            Профиль
          </router-link>

          <div class="user-section" v-if="isAuthenticated && user">
            <div class="user-avatar">
              <img :src="user.avatar" :alt="user.name" />
            </div>
            <button @click="logout" class="btn-logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <router-link 
            v-else 
            to="/login" 
            class="btn btn-primary"
            @click="closeMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2"/>
              <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Войти
          </router-link>
        </nav>

        <button class="menu-toggle" @click="toggleMenu" aria-label="Переключить меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
const isMenuOpen = ref<boolean>(false);

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = (): void => {
  isMenuOpen.value = false;
};

const logout = (): void => {
  authService.logout();
  authStore.setUser(null);
  router.push('/login');
  closeMenu();
};
</script>

<style scoped>
.header {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  height: 70px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 20px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), #3b82f6);
  border-radius: var(--radius);
  color: white;
}

.logo-text {
  background: linear-gradient(135deg, white, var(--gray-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  text-decoration: none;
  color: var(--gray-300);
  font-weight: 500;
  border-radius: var(--radius);
  transition: var(--transition);
  font-size: 14px;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-icon {
  opacity: 0.7;
}

.nav-link:hover .nav-icon,
.nav-link.active .nav-icon {
  opacity: 1;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius);
  color: var(--error-color);
  cursor: pointer;
  transition: var(--transition);
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-1px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  padding: 8px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.menu-toggle span {
  width: 20px;
  height: 2px;
  background: white;
  transition: var(--transition);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-slow);
    gap: 8px;
  }
  
  .nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    justify-content: flex-start;
    padding: 12px 16px;
    width: 100%;
  }

  .user-section {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 16px;
    margin-top: 8px;
    width: 100%;
    justify-content: space-between;
  }
}
</style>