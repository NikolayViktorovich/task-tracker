<template>
  <div class="oauth-callback">
    <div class="container-sm">
      <div class="callback-content">
        <div v-if="loading" class="loading-state">
          <div class="spinner-large"></div>
          <h2>Завершаем авторизацию...</h2>
          <p>Пожалуйста, подождите</p>
        </div>

        <div v-else-if="error" class="error-state">
          <div class="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h2>Ошибка авторизации</h2>
          <p>{{ error }}</p>
          <button @click="retry" class="btn btn-primary mt-6">
            Попробовать снова
          </button>
          <router-link to="/login" class="btn btn-ghost mt-4">
            Вернуться к входу
          </router-link>
        </div>

        <div v-else class="success-state">
          <div class="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>Авторизация успешна!</h2>
          <p>Перенаправляем вас в приложение...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth';

const authStore = useAuthStore();
const router = useRouter();

const loading = ref<boolean>(true);
const error = ref<string>('');

const handleCallback = async (): Promise<void> => {
  try {
    loading.value = true;
    error.value = '';

    const user = await authService.handleOAuthCallback();
    
    if (user) {
      authStore.setUser(user);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      throw new Error('Не удалось завершить авторизацию');
    }
  } catch (err: any) {
    error.value = err.message;
    console.error('OAuth callback error:', err);
  } finally {
    loading.value = false;
  }
};

const retry = (): void => {
  router.push('/login');
};

onMounted(() => {
  handleCallback();
});
</script>

<style scoped>
.oauth-callback {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.callback-content {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.loading-state,
.error-state,
.success-state {
  padding: 40px 0;
}

.spinner-large {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
}

.error-icon,
.success-icon {
  margin-bottom: 24px;
  opacity: 0.8;
}

.error-icon {
  color: var(--error-color);
}

.success-icon {
  color: var(--success-color);
}

h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: white;
}

p {
  color: var(--gray-400);
  font-size: 16px;
  line-height: 1.5;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .callback-content {
    padding: 0 16px;
  }
  
  h2 {
    font-size: 20px;
  }
}
</style>