<template>
  <div class="task-list">
    <div class="task-list-header">
      <div class="header-content">
        <h1>Мои задачи</h1>
        <p class="subtitle">Управляйте своими задачами эффективно</p>
      </div>
      <button @click="showTaskForm = true" class="btn btn-primary btn-add">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Новая задача
      </button>
    </div>

    <TaskForm 
      v-if="showTaskForm" 
      @save="handleSaveTask" 
      @cancel="showTaskForm = false" 
    />

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ tasks.length }}</div>
          <div class="stat-label">Всего задач</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon completed">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ completedTasks.length }}</div>
          <div class="stat-label">Выполнено</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon pending">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ pendingTasks.length }}</div>
          <div class="stat-label">В процессе</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon progress">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-number">{{ completionRate }}%</div>
          <div class="stat-label">Прогресс</div>
        </div>
      </div>
    </div>

    <div class="filters-section">
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs"
          :key="tab.value"
          @click="filter = tab.value"
          :class="['filter-tab', { active: filter === tab.value }]"
        >
          <span class="tab-label">{{ tab.label }}</span>
          <span class="tab-count">{{ getFilterCount(tab.value) }}</span>
        </button>
      </div>

      <div class="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="search-icon">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Поиск задач..."
          class="search-input"
        >
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <LoadingSpinner />
      <p>Загружаем ваши задачи...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h3>Ошибка загрузки</h3>
      <p>{{ error }}</p>
      <button @click="loadTasks" class="btn btn-primary mt-6">
        Попробовать снова
      </button>
    </div>

    <div v-else class="tasks-container">
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="2"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h3>Нет задач</h3>
        <p>Начните с создания новой задачи</p>
        <button @click="showTaskForm = true" class="btn btn-primary mt-6">
          Создать задачу
        </button>
      </div>

      <div v-else class="tasks-grid">
        <TaskItem 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :task="task" 
          @update="handleUpdateTask"
          @delete="handleDeleteTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/store';
import type { Task, TaskFilters } from '@/types';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';
import LoadingSpinner from './LoadingSpinner.vue';

const taskStore = useTaskStore();
const { tasks, loading, error, completedTasks, pendingTasks } = storeToRefs(taskStore);
const { setTasks, addTask, updateTask, deleteTask, setLoading, setError } = taskStore;

const showTaskForm = ref<boolean>(false);
const filter = ref<TaskFilters['status']>('all');
const searchQuery = ref<string>('');

const filterTabs = [
  { label: 'Все задачи', value: 'all' as const },
  { label: 'В процессе', value: 'pending' as const },
  { label: 'Выполненные', value: 'completed' as const }
];

const completionRate = computed(() => {
  if (tasks.value.length === 0) return 0;
  return Math.round((completedTasks.value.length / tasks.value.length) * 100);
});

const filteredTasks = computed(() => {
  let filtered = tasks.value;

  // Фильтр по статусу
  switch (filter.value) {
    case 'completed':
      filtered = completedTasks.value;
      break;
    case 'pending':
      filtered = pendingTasks.value;
      break;
  }

  // Поиск
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const getFilterCount = (filterType: TaskFilters['status']): number => {
  switch (filterType) {
    case 'all': return tasks.value.length;
    case 'completed': return completedTasks.value.length;
    case 'pending': return pendingTasks.value.length;
    default: return 0;
  }
};

const loadTasks = async (): Promise<void> => {
  try {
    setLoading(true);
    setError(null);
    const { taskService } = await import('@/services/api');
    const tasksData = await taskService.getTasks();
    setTasks(tasksData);
  } catch (err) {
    setError('Не удалось загрузить задачи');
    console.error('Error loading tasks:', err);
  } finally {
    setLoading(false);
  }
};

const handleSaveTask = async (taskData: { title: string }): Promise<void> => {
  try {
    setLoading(true);
    const { taskService } = await import('@/services/api');
    const newTask = await taskService.createTask({
      title: taskData.title,
      completed: false,
      userId: 1
    });
    
    // Добавляем задачу в список (JSONPlaceholder возвращает фиктивный ID 201)
    // Создаем временный ID для отображения
    const taskWithTempId = {
      ...newTask,
      id: Math.max(...tasks.value.map(t => t.id), 0) + 1
    };
    addTask(taskWithTempId);
    showTaskForm.value = false;
  } catch (err) {
    setError('Не удалось создать задачу');
    console.error('Error creating task:', err);
  } finally {
    setLoading(false);
  }
};

const handleUpdateTask = async (task: Task): Promise<void> => {
  try {
    const { taskService } = await import('@/services/api');
    await taskService.updateTask(task.id, task);
    updateTask(task);
  } catch (err) {
    setError('Не удалось обновить задачу');
    console.error('Error updating task:', err);
  }
};

const handleDeleteTask = async (taskId: number): Promise<void> => {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    try {
      const { taskService } = await import('@/services/api');
      await taskService.deleteTask(taskId);
      deleteTask(taskId);
    } catch (err) {
      setError('Не удалось удалить задачу');
      console.error('Error deleting task:', err);
    }
  }
};

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.task-list {
  padding: 40px 0;
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.header-content h1 {
  font-size: 36px;
  background: linear-gradient(135deg, white, var(--gray-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--gray-400);
  font-size: 16px;
}

.btn-add {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.stat-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
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
  font-size: 24px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: var(--gray-400);
  margin-top: 4px;
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 20px;
}

.filter-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  padding: 4px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--gray-400);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.filter-tab.active {
  background: rgba(37, 99, 235, 0.2);
  color: var(--primary-color);
}

.tab-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.filter-tab.active .tab-count {
  background: rgba(37, 99, 235, 0.3);
}

.search-box {
  position: relative;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  color: white;
  font-size: 14px;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: rgba(255, 255, 255, 0.1);
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.error-icon,
.empty-icon {
  margin-bottom: 20px;
  opacity: 0.5;
}

.error-state h3,
.empty-state h3 {
  margin-bottom: 8px;
  color: white;
}

.error-state p,
.empty-state p {
  color: var(--gray-400);
  max-width: 400px;
  margin: 0 auto;
}

.tasks-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 768px) {
  .task-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .filter-tabs {
    width: 100%;
    justify-content: stretch;
  }
  
  .filter-tab {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-content h1 {
    font-size: 28px;
  }
}
</style>