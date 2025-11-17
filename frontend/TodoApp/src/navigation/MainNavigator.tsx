import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { themeStore } from '../stores';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import EditTodoScreen from '../screens/EditTodoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TodoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TodoList" 
        component={TodoListScreen}
        options={{ title: 'My Todos' }}
      />
      <Stack.Screen 
        name="CreateTodo" 
        component={CreateTodoScreen}
        options={{ title: 'Create Todo' }}
      />
      <Stack.Screen 
        name="EditTodo" 
        component={EditTodoScreen}
        options={{ title: 'Edit Todo' }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = observer(() => {
  const { colors } = themeStore;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Todos" 
        component={TodoStack}
        options={{
          tabBarLabel: 'Todos',
          // You can add icons here if you have react-native-vector-icons set up
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
    </Tab.Navigator>
  );
});

export default MainNavigator;
