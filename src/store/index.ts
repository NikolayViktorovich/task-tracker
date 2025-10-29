import { defineStore } from 'pinia';
import { AuthState, TaskState, User, Task } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),
  
  actions: {
    setUser(user: User | null): void {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    
    setLoading(loading: boolean): void {
      this.loading = loading;
    },
    
    logout(): void {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  }
});

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null
  }),
  
  getters: {
    completedTasks: (state): Task[] => state.tasks.filter(task => task.completed),
    pendingTasks: (state): Task[] => state.tasks.filter(task => !task.completed)
  },
  
  actions: {
    setTasks(tasks: Task[]): void {
      this.tasks = tasks;
    },
    
    addTask(task: Task): void {
      this.tasks.unshift(task);
    },
    
    updateTask(updatedTask: Task): void {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    
    deleteTask(taskId: number): void {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    
    setLoading(loading: boolean): void {
      this.loading = loading;
    },
    
    setError(error: string | null): void {
      this.error = error;
    }
  }
});