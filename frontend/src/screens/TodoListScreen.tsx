import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  TextInput,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { todoStore, themeStore } from '../stores';
import { RootStackParamList, Todo } from '../types';
import TodoItem from '../components/TodoItem';

type TodoListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

const TodoListScreen = observer(() => {
  const navigation = useNavigation<TodoListScreenNavigationProp>();
  const { colors } = themeStore;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await todoStore.fetchTodos({
      search: searchQuery || undefined,
      completed: filterCompleted,
    });
  };

  const handleRefresh = () => {
    fetchTodos();
  };

  const handleToggleTodo = async (todo: Todo) => {
    await todoStore.toggleTodo(todo.id);
  };

  const handleDeleteTodo = async (todo: Todo) => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await todoStore.deleteTodo(todo.id);
            if (!result.success) {
              Alert.alert('Error', result.error || 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  const handleEditTodo = (todo: Todo) => {
    navigation.navigate('EditTodo', { todo });
  };

  const handleSearch = () => {
    fetchTodos();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilterCompleted(undefined);
    todoStore.fetchTodos();
  };

  const handleDeleteCompleted = () => {
    const completedCount = todoStore.completedTodos.length;
    if (completedCount === 0) {
      Alert.alert('No Completed Todos', 'There are no completed todos to delete.');
      return;
    }

    Alert.alert(
      'Delete Completed Todos',
      `Are you sure you want to delete all ${completedCount} completed todos?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            const result = await todoStore.deleteCompletedTodos();
            if (!result.success) {
              Alert.alert('Error', result.error || 'Failed to delete completed todos');
            }
          },
        },
      ]
    );
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={() => handleToggleTodo(item)}
      onEdit={() => handleEditTodo(item)}
      onDelete={() => handleDeleteTodo(item)}
    />
  );

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTodo')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search todos..."
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCompleted === undefined && styles.activeFilter,
          ]}
          onPress={() => {
            setFilterCompleted(undefined);
            todoStore.fetchTodos();
          }}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterCompleted === undefined && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCompleted === false && styles.activeFilter,
          ]}
          onPress={() => {
            setFilterCompleted(false);
            todoStore.fetchTodos({ completed: false });
          }}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterCompleted === false && styles.activeFilterText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterCompleted === true && styles.activeFilter,
          ]}
          onPress={() => {
            setFilterCompleted(true);
            todoStore.fetchTodos({ completed: true });
          }}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterCompleted === true && styles.activeFilterText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total: {todoStore.todos.length} | Pending: {todoStore.pendingTodos.length} | 
          Completed: {todoStore.completedTodos.length}
        </Text>
        {todoStore.completedTodos.length > 0 && (
          <TouchableOpacity onPress={handleDeleteCompleted}>
            <Text style={styles.deleteCompletedText}>Clear Completed</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Todo List */}
      <FlatList
        data={todoStore.todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={todoStore.isLoading}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery || filterCompleted !== undefined
                ? 'No todos match your criteria'
                : 'No todos yet. Create your first todo!'}
            </Text>
          </View>
        }
      />
    </View>
  );
});

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.text,
      marginRight: 8,
    },
    searchButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      justifyContent: 'center',
    },
    searchButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      marginRight: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeFilter: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeFilterText: {
      color: '#FFFFFF',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      marginHorizontal: 20,
      borderRadius: 8,
      marginBottom: 16,
    },
    statsText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    deleteCompletedText: {
      fontSize: 14,
      color: colors.danger,
      fontWeight: '600',
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default TodoListScreen;
