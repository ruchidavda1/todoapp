import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/api';
import { User, LoginCredentials, SignupData } from '../types';

class AuthStore {
  user: User | null = null;
  isAuthenticated = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        runInAction(() => {
          this.user = user;
          this.isAuthenticated = true;
        });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  }

  async login(credentials: LoginCredentials) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.login(credentials);
      const { token, user } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async signup(userData: SignupData) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.signup(userData);
      const { token, user } = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Signup failed';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');

      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
        this.error = null;
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async updateProfile(userData: { firstName?: string; lastName?: string }) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await apiService.updateProfile(userData);
      const { user } = response.data;

      await AsyncStorage.setItem('user', JSON.stringify(user));

      runInAction(() => {
        this.user = user;
      });

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Profile update failed';
      this.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      this.setLoading(false);
    }
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
}

export const authStore = new AuthStore();
export default authStore;
