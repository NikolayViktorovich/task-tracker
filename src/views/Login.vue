<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-hero">
        <div class="hero-content">
          <div class="hero-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
              <path d="M12 12H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 13H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 17H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h1>TaskTracker</h1>
          <p class="hero-subtitle">
            Современная платформа для управления задачами. 
            Создавайте, отслеживайте и завершайте задачи эффективно.
          </p>
          <div class="hero-features">
            <div class="feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Отслеживание прогресса</span>
            </div>
            <div class="feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
                <path d="M19.4 15C19.2669 15.3044 19.1033 15.5955 18.912 15.8686C17.8305 17.3484 16.2009 18.4029 14.3538 18.8238C12.5067 19.2447 10.5735 19.0035 8.90029 18.1444C7.22706 17.2853 5.93108 15.8663 5.25369 14.1564C4.5763 12.4465 4.56416 10.5684 5.21964 8.84966C5.87512 7.13089 7.15359 5.69602 8.81684 4.81494C10.4801 3.93386 12.4127 3.66742 14.268 4.06288C16.1233 4.45834 17.773 5.48969 18.882 6.96057" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>Безопасная авторизация</span>
            </div>
            <div class="feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
                <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
                <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Умная организация</span>
            </div>
          </div>
        </div>
      </div>

      <div class="login-form-section">
        <div class="login-form-container">
          <div class="form-header">
            <h2>Вход в систему</h2>
            <p>Выберите способ авторизации</p>
          </div>

          <div class="oauth-buttons">
            <button 
              v-if="isGoogleConfigured"
              @click="loginWithGoogle" 
              class="oauth-btn google"
              :disabled="loading"
            >
              <div class="oauth-icon">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div class="oauth-content">
                <span class="oauth-title">
                  {{ loading ? 'Перенаправление...' : 'Войти через Google' }}
                </span>
                <span class="oauth-subtitle">Безопасный вход с аккаунтом Google</span>
              </div>
              <div class="oauth-arrow" v-if="!loading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <button 
              v-if="isGitHubConfigured"
              @click="loginWithGitHub" 
              class="oauth-btn github"
              :disabled="loading"
            >
              <div class="oauth-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="oauth-content">
                <span class="oauth-title">
                  {{ loading ? 'Перенаправление...' : 'Войти через GitHub' }}
                </span>
                <span class="oauth-subtitle">Для разработчиков и IT-специалистов</span>
              </div>
              <div class="oauth-arrow" v-if="!loading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </button>

            <div v-if="!isGoogleConfigured && !isGitHubConfigured" class="config-error">
              <div class="error-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="error-content">
                <h3>OAuth не настроен</h3>
                <p>Для работы приложения необходимо настроить OAuth провайдеры.</p>
                <p>Добавьте переменные окружения:</p>
                <ul>
                  <li>VITE_GOOGLE_OAUTH_CLIENT_ID</li>
                  <li>VITE_GOOGLE_OAUTH_CLIENT_SECRET</li>
                  <li>VITE_GITHUB_OAUTH_CLIENT_ID</li>
                  <li>VITE_GITHUB_OAUTH_CLIENT_SECRET</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { authService } from '@/services/auth';
import type { OAuthProvider } from '@/config/oauth';

const loading = ref<boolean>(false);

const isGoogleConfigured = computed(() => authService.isOAuthConfigured('google'));
const isGitHubConfigured = computed(() => authService.isOAuthConfigured('github'));

const loginWithOAuth = async (provider: OAuthProvider): Promise<void> => {
  try {
    loading.value = true;
    await authService.loginWithOAuth(provider);
  } catch (error) {
    console.error('Login error:', error);
    alert(`Ошибка авторизации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    loading.value = false;
  }
};

const loginWithGoogle = (): void => {
  loginWithOAuth('google');
};

const loginWithGitHub = (): void => {
  loginWithOAuth('github');
};
</script>

<style scoped>
.oauth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.config-error {
  text-align: center;
  padding: 30px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-lg);
}

.config-error .error-icon {
  color: var(--error-color);
  margin-bottom: 16px;
}

.config-error h3 {
  color: var(--error-color);
  margin-bottom: 12px;
  font-size: 18px;
}

.config-error p {
  color: var(--gray-300);
  margin-bottom: 8px;
  font-size: 14px;
}

.config-error ul {
  text-align: left;
  color: var(--gray-400);
  font-size: 12px;
  margin-top: 12px;
}

.config-error li {
  margin-bottom: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
}
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.login-hero {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  max-width: 400px;
}

.hero-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  color: white;
}

.hero-content h1 {
  font-size: 32px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, white, var(--gray-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  color: var(--gray-300);
  line-height: 1.6;
  margin-bottom: 32px;
  font-size: 16px;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gray-300);
  font-size: 14px;
}

.feature svg {
  opacity: 0.7;
}

.login-form-section {
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  font-size: 28px;
  margin-bottom: 8px;
  color: white;
}

.form-header p {
  color: var(--gray-400);
  font-size: 16px;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.oauth-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  color: white;
  cursor: pointer;
  transition: var(--transition-slow);
  text-align: left;
  width: 100%;
}

.oauth-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.oauth-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.oauth-content {
  flex: 1;
}

.oauth-title {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.oauth-subtitle {
  display: block;
  font-size: 12px;
  color: var(--gray-400);
}

.oauth-arrow {
  opacity: 0.5;
  transition: var(--transition);
}

.oauth-btn:hover .oauth-arrow {
  opacity: 1;
  transform: translateX(2px);
}

.oauth-btn.google:hover {
  border-color: rgba(66, 133, 244, 0.3);
}

.oauth-btn.github:hover {
  border-color: rgba(51, 51, 51, 0.3);
}

.oauth-btn.facebook:hover {
  border-color: rgba(24, 119, 242, 0.3);
}

.demo-notice {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: var(--radius);
}

.notice-icon {
  display: flex;
  align-items: flex-start;
  color: var(--warning-color);
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
}

.notice-content strong {
  display: block;
  color: var(--warning-color);
  font-size: 14px;
  margin-bottom: 4px;
}

.notice-content p {
  font-size: 12px;
  color: var(--gray-300);
  line-height: 1.4;
  margin: 0;
}

.loading-state {
  text-align: center;
  padding: 40px 20px;
}

.spinner-large {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary-color);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-state p {
  color: var(--gray-400);
  font-size: 14px;
}

@media (max-width: 968px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .login-hero {
    padding: 40px 20px;
  }
  
  .login-form-section {
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px;
  }
  
  .hero-content h1 {
    font-size: 28px;
  }
  
  .form-header h2 {
    font-size: 24px;
  }
  
  .oauth-btn {
    padding: 14px 16px;
  }
}
</style>