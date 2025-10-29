export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github' | 'facebook';
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface TaskFilters {
  status: 'all' | 'completed' | 'pending';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}