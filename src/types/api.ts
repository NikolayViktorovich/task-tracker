export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github' | 'facebook';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}