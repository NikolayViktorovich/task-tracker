<template>
  <div class="task-item" :class="{ completed: task.completed, editing: isEditing }">
    <div class="task-content">
      <div class="task-checkbox">
        <input 
          type="checkbox" 
          :id="'task-' + task.id" 
          :checked="task.completed" 
          @change="toggleComplete"
        />
        <label :for="'task-' + task.id">
          <svg v-if="task.completed" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
      </div>

      <div class="task-main" @dblclick="editTask">
        <div class="task-header">
          <h4 :class="{ 'task-title-completed': task.completed }">
            {{ task.title }}
          </h4>
          <div class="task-meta">
            <span class="task-id">#{{ task.id }}</span>
            <span class="task-status" :class="task.completed ? 'completed' : 'pending'">
              {{ task.completed ? 'Выполнено' : 'В процессе' }}
            </span>
          </div>
        </div>
        <div class="task-footer">
          <div class="task-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :class="{ completed: task.completed }"
                :style="{ width: task.completed ? '100%' : '0%' }"
              ></div>
            </div>
          </div>
          <div class="task-dates">
            <span class="date-created">Создано: {{ formatDate(task.id) }}</span>
          </div>
        </div>
      </div>

      <div class="task-actions">
        <button @click="editTask" class="btn-action" title="Редактировать">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2"/>
            <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button @click="deleteTask" class="btn-action danger" title="Удалить">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isEditing" class="task-edit-form">
      <div class="edit-header">
        <h4>Редактирование задачи</h4>
      </div>
      <div class="edit-content">
        <input 
          type="text" 
          v-model="editTitle" 
          @keyup.enter="saveEdit" 
          @keyup.esc="cancelEdit"
          class="form-control edit-input"
          placeholder="Введите новое название задачи..."
          ref="editInput"
        />
        <div class="edit-actions">
          <button @click="saveEdit" class="btn btn-primary btn-sm">
            Сохранить
          </button>
          <button @click="cancelEdit" class="btn btn-ghost btn-sm">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { Task } from '@/types';

interface Props {
  task: Task;
}

interface Emits {
  (e: 'update', task: Task): void;
  (e: 'delete', taskId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isEditing = ref<boolean>(false);
const editTitle = ref<string>(props.task.title);
const editInput = ref<HTMLInputElement | null>(null);

const formatDate = (taskId: number): string => {
  const baseDate = new Date('2024-01-01');
  const date = new Date(baseDate.getTime() + (taskId * 24 * 60 * 60 * 1000));
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const toggleComplete = (): void => {
  const updatedTask: Task = {
    ...props.task,
    completed: !props.task.completed
  };
  emit('update', updatedTask);
};

const editTask = (): void => {
  isEditing.value = true;
  editTitle.value = props.task.title;
  nextTick(() => {
    editInput.value?.focus();
  });
};

const saveEdit = (): void => {
  if (editTitle.value.trim()) {
    const updatedTask: Task = {
      ...props.task,
      title: editTitle.value.trim()
    };
    emit('update', updatedTask);
    isEditing.value = false;
  }
};

const cancelEdit = (): void => {
  isEditing.value = false;
  editTitle.value = props.task.title;
};

const deleteTask = (): void => {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    emit('delete', props.task.id);
  }
};
</script>

<style scoped>
.task-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: var(--transition-slow);
  position: relative;
}

.task-item:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.task-item.completed {
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.03);
}

.task-item.completed:hover {
  opacity: 0.9;
}

.task-item.editing {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.task-checkbox {
  position: relative;
  margin-top: 2px;
}

.task-checkbox input {
  display: none;
}

.task-checkbox label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-400);
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  background: rgba(255, 255, 255, 0.05);
}

.task-checkbox input:checked + label {
  background: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.task-checkbox label:hover {
  border-color: var(--gray-300);
}

.task-main {
  flex: 1;
  min-width: 0;
  cursor: pointer;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.task-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  word-break: break-word;
}

.task-title-completed {
  text-decoration: line-through;
  color: var(--gray-400) !important;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.task-id {
  font-size: 12px;
  color: var(--gray-500);
  font-family: 'Monaco', 'Consolas', monospace;
}

.task-status {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.task-status.pending {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.task-status.completed {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.task-progress {
  flex: 1;
  max-width: 200px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gray-400);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background: var(--success-color);
}

.task-dates {
  font-size: 12px;
  color: var(--gray-500);
}

.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: var(--transition);
}

.task-item:hover .task-actions {
  opacity: 1;
}

.btn-action {
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
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-1px);
}

.btn-action.danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: var(--error-color);
}

.task-edit-form {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.edit-header h4 {
  font-size: 14px;
  color: var(--gray-300);
  margin-bottom: 12px;
}

.edit-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.edit-input {
  flex: 1;
  font-size: 14px;
  padding: 8px 12px;
}

.edit-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .task-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .task-meta {
    align-self: flex-end;
  }
  
  .task-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .task-progress {
    max-width: none;
  }
  
  .task-actions {
    align-self: flex-end;
    opacity: 1;
  }
  
  .edit-content {
    flex-direction: column;
  }
  
  .edit-actions {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .task-item {
    padding: 16px;
  }
  
  .task-header h4 {
    font-size: 15px;
  }
}
</style>