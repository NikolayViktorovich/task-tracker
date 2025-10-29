<template>
  <Modal
    :show="show"
    :title="title"
    :type="modalType"
    size="sm"
    :closable="false"
    :close-on-overlay="false"
    @update:show="$emit('update:show', $event)"
    @close="$emit('cancel')"
  >
    <p class="confirm-message">{{ message }}</p>

    <template #footer>
      <button @click="$emit('cancel')" class="btn btn-ghost">
        {{ cancelText }}
      </button>
      <button 
        @click="$emit('confirm')" 
        class="btn"
        :class="confirmButtonClass"
        autofocus
      >
        {{ confirmText }}
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
  type?: 'warning' | 'error' | 'info';
  confirmText?: string;
  cancelText?: string;
}

interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена'
});

const emit = defineEmits<Emits>();

const modalType = computed(() => {
  return props.type as 'warning' | 'error' | 'info';
});

const confirmButtonClass = computed(() => {
  return {
    warning: 'btn-warning',
    error: 'btn-danger',
    info: 'btn-primary'
  }[props.type];
});
</script>

<style scoped>
.confirm-message {
  color: var(--gray-300);
  line-height: 1.5;
  margin: 0;
  text-align: center;
}
</style>