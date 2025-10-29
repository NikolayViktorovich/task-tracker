<template>
  <Modal
    :show="show"
    :title="title"
    :type="type"
    size="sm"
    :closable="closable"
    @update:show="$emit('update:show', $event)"
    @close="$emit('close')"
  >
    <p class="notification-message">{{ message }}</p>

    <template #footer>
      <button 
        v-if="actionText"
        @click="$emit('action')" 
        class="btn"
        :class="actionButtonClass"
      >
        {{ actionText }}
      </button>
      <button 
        @click="$emit('close')" 
        class="btn btn-primary"
      >
        {{ closeText }}
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Modal from './Modal.vue';

interface Props {
  show: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  actionText?: string;
  closeText?: string;
  closable?: boolean;
  autoClose?: number;
}

interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'close'): void;
  (e: 'action'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  closeText: 'Закрыть',
  closable: true,
  autoClose: 0
});

const emit = defineEmits<Emits>();

const actionButtonClass = computed(() => {
  return {
    success: 'btn-success',
    error: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-primary'
  }[props.type];
});
</script>

<style scoped>
.notification-message {
  color: var(--gray-300);
  line-height: 1.5;
  margin: 0;
  text-align: center;
}
</style>