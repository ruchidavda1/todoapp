import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../types';

class ThemeStore {
  theme: Theme = 'light';

  constructor() {
    makeAutoObservable(this);
    this.initializeTheme();
  }

  async initializeTheme() {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        this.theme = savedTheme as Theme;
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }

  async toggleTheme() {
    const newTheme: Theme = this.theme === 'light' ? 'dark' : 'light';
    this.theme = newTheme;
    
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  async setTheme(theme: Theme) {
    this.theme = theme;
    
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  get isDark() {
    return this.theme === 'dark';
  }

  get colors() {
    return this.theme === 'dark' ? darkColors : lightColors;
  }
}

const lightColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6D6D70',
  border: '#C6C6C8',
  placeholder: '#8E8E93',
  card: '#FFFFFF',
  shadow: '#000000',
};

const darkColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  success: '#30D158',
  warning: '#FF9F0A',
  danger: '#FF453A',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  placeholder: '#8E8E93',
  card: '#2C2C2E',
  shadow: '#000000',
};

export const themeStore = new ThemeStore();
export default themeStore;
