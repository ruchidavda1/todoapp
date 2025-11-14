import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL - automatically switches between development and production
const BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://your-app-name.onrender.com/api';  // Production - UPDATE THIS URL

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, clear storage
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('user');
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signup(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse> {
    return this.api.post('/auth/signup', userData);
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> {
    return this.api.post('/auth/login', credentials);
  }

  async getProfile(): Promise<AxiosResponse> {
    return this.api.get('/auth/profile');
  }

  async updateProfile(userData: {
    firstName?: string;
    lastName?: string;
  }): Promise<AxiosResponse> {
    return this.api.put('/auth/profile', userData);
  }

  // Todo endpoints
  async getTodos(params?: {
    page?: number;
    limit?: number;
    completed?: boolean;
    priority?: string;
    search?: string;
  }): Promise<AxiosResponse> {
    return this.api.get('/todos', { params });
  }

  async getTodo(id: string): Promise<AxiosResponse> {
    return this.api.get(`/todos/${id}`);
  }

  async createTodo(todoData: {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
  }): Promise<AxiosResponse> {
    return this.api.post('/todos', todoData);
  }

  async updateTodo(
    id: string,
    todoData: {
      title?: string;
      description?: string;
      completed?: boolean;
      priority?: 'low' | 'medium' | 'high';
      dueDate?: string;
    }
  ): Promise<AxiosResponse> {
    return this.api.put(`/todos/${id}`, todoData);
  }

  async toggleTodo(id: string): Promise<AxiosResponse> {
    return this.api.patch(`/todos/${id}/toggle`);
  }

  async deleteTodo(id: string): Promise<AxiosResponse> {
    return this.api.delete(`/todos/${id}`);
  }

  async deleteCompletedTodos(): Promise<AxiosResponse> {
    return this.api.delete('/todos/completed/all');
  }
}

export const apiService = new ApiService();
export default apiService;
