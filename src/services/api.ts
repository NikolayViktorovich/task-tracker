import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Task } from '@/types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 8000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;
        if ((error.code === 'ECONNABORTED' || !error.response) && !originalRequest._retry) {
          originalRequest._retry = true;
          console.log('Retrying request...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          return this.api(originalRequest);
        }

        console.error('API Error:', {
          message: error.message,
          code: error.code,
          url: error.config?.url,
          status: error.response?.status
        });

        return Promise.reject(error);
      }
    );
  }

  async getTasks(): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await this.api.get('/todos?_limit=15');
      console.log('Tasks loaded successfully');
      return response.data;
    } catch (error: any) {
      console.error('Failed to load tasks:', error.message);
      throw new Error('Не удалось загрузить задачи. Проверьте подключение к интернету.');
    }
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await this.api.post('/todos', {
        ...task,
        userId: 1
      });
      return {
        ...response.data,
        id: Date.now()
      };
    } catch (error: any) {
      console.error('Failed to create task:', error.message);
      return {
        id: Date.now(),
        userId: 1,
        title: task.title,
        completed: task.completed || false
      };
    }
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await this.api.put(`/todos/${id}`, task);
      return response.data;
    } catch (error: any) {
      console.error('Failed to update task:', error.message);
      return {
        id,
        userId: 1,
        title: task.title || 'Unknown',
        completed: task.completed || false
      };
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.api.delete(`/todos/${id}`);
    } catch (error: any) {
      console.error('Failed to delete task:', error.message);
      throw new Error('Не удалось удалить задачу на сервере, но она удалена локально.');
    }
  }
}

export const taskService = new ApiService();
export default ApiService;