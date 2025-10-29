<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="handleOverlayClick">
      <div class="modal-container" :class="size">
        <div class="modal-header">
          <div class="modal-title">
            <slot name="icon">
              <div class="modal-icon">
                <component :is="getIconComponent" />
              </div>
            </slot>
            <h3>{{ title }}</h3>
          </div>
          <button v-if="closable" @click="close" class="modal-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-content">
          <slot></slot>
        </div>
        
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  show: boolean;
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  closable?: boolean;
  closeOnOverlay?: boolean;
}

interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  size: 'md',
  closable: true,
  closeOnOverlay: true
});

const emit = defineEmits<Emits>();

const getIconComponent = computed(() => {
  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  };
  return icons[props.type];
});

const close = (): void => {
  emit('update:show', false);
  emit('close');
};

const handleOverlayClick = (): void => {
  if (props.closeOnOverlay) {
    close();
  }
};
</script>

<script lang="ts">
const SuccessIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-success">
      <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
};

const ErrorIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-error">
      <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
};

const WarningIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-warning">
      <path d="M12 9V11M12 15H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
};

const InfoIcon = {
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="icon-info">
      <path d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modal-appear 0.2s ease-out;
}

.modal-container.sm {
  max-width: 400px;
}

.modal-container.md {
  max-width: 500px;
}

.modal-container.lg {
  max-width: 600px;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 0;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.modal-title h3 {
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.modal-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Цвета иконок */
.icon-success {
  color: var(--success-color);
}

.icon-error {
  color: var(--error-color);
}

.icon-warning {
  color: var(--warning-color);
}

.icon-info {
  color: #3b82f6;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  color: var(--gray-400);
  cursor: pointer;
  transition: var(--transition);
  flex-shrink: 0;
  margin-left: 12px;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 0 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Анимации */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
  opacity: 0;
}

@keyframes modal-appear {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .modal-overlay {
    padding: 16px;
  }
  
  .modal-header {
    padding: 20px 20px 0;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 0 20px 20px;
    flex-direction: column;
  }
  
  .modal-footer .btn {
    width: 100%;
  }
}
</style>