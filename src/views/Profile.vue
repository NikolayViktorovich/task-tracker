<template>
  <div class="profile-page">
    <div class="container-sm">
      <div class="profile-header">
        <h1>Профиль пользователя</h1>
        <p>Управление вашей учетной записью и статистика</p>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <div class="section-header">
            <h2>Информация о пользователе</h2>
          </div>
          <div class="user-info-card card">
            <div class="user-avatar-large">
              <img :src="user?.avatar" :alt="user?.name" />
            </div>
            <div class="user-details">
              <h3>{{ user?.name }}</h3>
              <div class="user-meta">
                <div class="meta-item">
                  <span class="meta-label">Email:</span>
                  <span class="meta-value">{{ user?.email }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Провайдер:</span>
                  <span class="meta-value badge-provider" :class="user?.provider">
                    {{ getProviderName(user?.provider) }}
                  </span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">ID пользователя:</span>
                  <span class="meta-value">{{ user?.id }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <div class="section-header">
            <h2>Статистика задач</h2>
            <p>Обзор вашей продуктивности</p>
          </div>
          <div class="stats-grid">
            <div class="stat-card-large">
              <div class="stat-icon total">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ totalTasks }}</div>
                <div class="stat-label">Всего задач</div>
              </div>
            </div>

            <div class="stat-card-large">
              <div class="stat-icon completed">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ completedTasks }}</div>
                <div class="stat-label">Выполнено</div>
              </div>
            </div>

            <div class="stat-card-large">
              <div class="stat-icon pending">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ pendingTasks }}</div>
                <div class="stat-label">В процессе</div>
              </div>
            </div>

            <div class="stat-card-large">
              <div class="stat-icon progress">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ completionRate }}%</div>
                <div class="stat-label">Прогресс</div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <div class="section-header">
            <h2>Действия</h2>
          </div>
          <div class="actions-card card">
            <div class="action-item">
              <div class="action-info">
                <h4>Выйти из системы</h4>
                <p>Завершите текущий сеанс работы</p>
              </div>
              <button @click="logout" class="btn btn-danger">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore, useTaskStore } from '@/store';
import type { User } from '@/types';

const authStore = useAuthStore();
const taskStore = useTaskStore();
const router = useRouter();

const { user } = storeToRefs(authStore);
const { tasks, completedTasks, pendingTasks } = storeToRefs(taskStore);

const totalTasks = computed(() => tasks.value.length);
const completionRate = computed(() => {
  if (tasks.value.length === 0) return 0;
  return Math.round((completedTasks.value.length / tasks.value.length) * 100);
});

const getProviderName = (provider?: User['provider']): string => {
  if (!provider) return 'Неизвестно';
  
  const providers = {
    google: 'Google',
    github: 'GitHub',
    facebook: 'Facebook'
  };
  return providers[provider];
};

const logout = (): void => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.profile-page {
  padding: 40px 0;
}

.profile-header {
  text-align: center;
  margin-bottom: 48px;
}

.profile-header h1 {
  font-size: 36px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, white, var(--gray-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-header p {
  color: var(--gray-400);
  font-size: 16px;
}

.profile-section {
  margin-bottom: 40px;
}

.section-header {
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 24px;
  margin-bottom: 4px;
  color: white;
}

.section-header p {
  color: var(--gray-400);
  font-size: 14px;
}

.user-info-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
}

.user-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.user-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: white;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-label {
  font-weight: 600;
  color: var(--gray-300);
  min-width: 120px;
  font-size: 14px;
}

.meta-value {
  color: white;
  font-size: 14px;
}

.badge-provider {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-provider.google {
  background: rgba(66, 133, 244, 0.2);
  color: #4285f4;
  border: 1px solid rgba(66, 133, 244, 0.3);
}

.badge-provider.github {
  background: rgba(51, 51, 51, 0.2);
  color: #333;
  border: 1px solid rgba(51, 51, 51, 0.3);
}

.badge-provider.facebook {
  background: rgba(24, 119, 242, 0.2);
  color: #1877f2;
  border: 1px solid rgba(24, 119, 242, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card-large {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.stat-card-large:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.stat-icon.total {
  background: rgba(37, 99, 235, 0.2);
  color: var(--primary-color);
}

.stat-icon.completed {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
}

.stat-icon.pending {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning-color);
}

.stat-icon.progress {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--gray-400);
}

.actions-card {
  padding: 24px;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.action-info h4 {
  font-size: 16px;
  margin-bottom: 4px;
  color: white;
}

.action-info p {
  color: var(--gray-400);
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .user-info-card {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
  
  .user-meta {
    align-items: center;
  }
  
  .meta-item {
    flex-direction: column;
    gap: 4px;
  }
  
  .meta-label {
    min-width: auto;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .stat-card-large {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .action-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .action-item .btn {
    align-self: stretch;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-header h1 {
    font-size: 28px;
  }
  
  .user-avatar-large {
    width: 80px;
    height: 80px;
  }
}
</style>