import { makeAutoObservable, runInAction } from 'mobx';
import { apiService } from '../services/api';
import { Todo, CreateTodoData, UpdateTodoData } from '../types';

class TodoStore {
  todos: Todo[] = [];
  isLoading = false;
  error: string | null = null;
  pagination = {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTodos(params?: {
    page?: number;
    limit?: number;
    completed?: boolean;
    priority?: string;
    search?: string;
  }) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.getTodos(params);
      const { todos, pagination } = response.data;

      runInAction(() => {
        if (params?.page === 1 || !params?.page) {
          this.todos = todos;
        } else {
          // Append for pagination
          this.todos = [...this.todos, ...todos];
        }
        this.pagination = pagination;
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch todos';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async createTodo(todoData: CreateTodoData) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.createTodo(todoData);
      const { todo } = response.data;

      runInAction(() => {
        this.todos = [todo, ...this.todos];
        this.pagination.total += 1;
      });

      return { success: true, todo };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create todo';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async updateTodo(id: string, todoData: UpdateTodoData) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.updateTodo(id, todoData);
      const { todo } = response.data;

      runInAction(() => {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
          this.todos[index] = todo;
        }
      });

      return { success: true, todo };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update todo';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async toggleTodo(id: string) {
    try {
      const response = await apiService.toggleTodo(id);
      const { todo } = response.data;

      runInAction(() => {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
          this.todos[index] = todo;
        }
      });

      return { success: true, todo };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to toggle todo';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  async deleteTodo(id: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      await apiService.deleteTodo(id);

      runInAction(() => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.pagination.total -= 1;
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to delete todo';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async deleteCompletedTodos() {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.deleteCompletedTodos();
      const { deletedCount } = response.data;

      runInAction(() => {
        this.todos = this.todos.filter(t => !t.completed);
        this.pagination.total -= deletedCount;
      });

      return { success: true, deletedCount };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to delete completed todos';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  // Computed values
  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  get pendingTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  get todosByPriority() {
    return {
      high: this.todos.filter(todo => todo.priority === 'high'),
      medium: this.todos.filter(todo => todo.priority === 'medium'),
      low: this.todos.filter(todo => todo.priority === 'low'),
    };
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  clearError() {
    this.error = null;
  }

  clearTodos() {
    this.todos = [];
    this.pagination = {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  }
}

export const todoStore = new TodoStore();
export default todoStore;
