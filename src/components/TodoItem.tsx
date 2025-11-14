import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { themeStore } from '../stores';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem = observer(({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const { colors } = themeStore;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.danger;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
        <View style={[styles.checkbox, todo.completed && styles.checkedBox]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {todo.description && (
          <Text style={[styles.description, todo.completed && styles.completedText]}>
            {todo.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.priorityContainer}>
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: getPriorityColor(todo.priority) },
              ]}
            />
            <Text style={styles.priorityText}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
            </Text>
          </View>

          {todo.dueDate && (
            <Text style={styles.dueDate}>Due: {formatDate(todo.dueDate)}</Text>
          )}
        </View>

        <Text style={styles.timestamp}>
          Created: {formatDate(todo.createdAt)}
        </Text>
      </View>
    </View>
  );
});

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    checkboxContainer: {
      marginRight: 12,
      paddingTop: 2,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedBox: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginRight: 8,
    },
    completedTitle: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    completedText: {
      textDecorationLine: 'line-through',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    priorityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priorityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    priorityText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    dueDate: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    timestamp: {
      fontSize: 11,
      color: colors.placeholder,
    },
    actions: {
      flexDirection: 'row',
    },
    actionButton: {
      marginLeft: 8,
    },
    editButtonText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    deleteButtonText: {
      fontSize: 14,
      color: colors.danger,
      fontWeight: '600',
    },
  });

export default TodoItem;
