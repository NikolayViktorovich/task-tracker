<template>
  <div class="task-form card card-glass">
    <div class="form-header">
      <h3>Создание новой задачи</h3>
      <p>Добавьте задачу, чтобы начать отслеживать прогресс</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="form-body">
      <div class="form-group">
        <label for="task-title" class="form-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="label-icon">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
          </svg>
          Название задачи
        </label>
        <textarea 
          id="task-title"
          v-model="title" 
          class="form-control form-textarea"
          placeholder="Опишите вашу задачу..."
          rows="3"
          required
          ref="titleInput"
        ></textarea>
        <div class="form-hint">
          Напишите четкое и понятное описание задачи
        </div>
      </div>
      
      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="!title.trim()"
          :class="{ 'btn-loading': loading }"
        >
          <span v-if="!loading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Создать задачу
          </span>
          <span v-else>Создание...</span>
        </button>
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="btn btn-ghost"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Emits {
  (e: 'save', task: { title: string }): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>();

const title = ref<string>('');
const loading = ref<boolean>(false);
const titleInput = ref<HTMLTextAreaElement | null>(null);

const handleSubmit = async (): Promise<void> => {
  if (title.value.trim() && !loading.value) {
    loading.value = true;
    
    // Имитация загрузки
    setTimeout(() => {
      emit('save', {
        title: title.value.trim()
      });
      title.value = '';
      loading.value = false;
    }, 800);
  }
};

onMounted(() => {
  titleInput.value?.focus();
});
</script>

<style scoped>
.task-form {
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.form-header {
  margin-bottom: 24px;
  text-align: center;
}

.form-header h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: white;
}

.form-header p {
  color: var(--gray-400);
  font-size: 14px;
}

.form-body {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--gray-200);
  font-size: 14px;
}

.label-icon {
  opacity: 0.7;
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

.form-hint {
  font-size: 12px;
  color: var(--gray-500);
  margin-top: 6px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loading:hover {
  transform: none;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
  }
}
</style>