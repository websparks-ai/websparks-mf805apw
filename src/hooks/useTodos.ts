import { useState, useEffect } from 'react';
import { Todo, FilterType, SortType } from '../types/todo';

const STORAGE_KEY = 'todomaster-todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Todo['priority'] = 'medium', category?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority,
      category
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, text: text.trim(), updatedAt: new Date() }
        : todo
    ));
  };

  const updateTodoPriority = (id: string, priority: Todo['priority']) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, priority, updatedAt: new Date() }
        : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }

    // Apply sorting
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return filtered;
  };

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
    completionRate: todos.length > 0 ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100) : 0
  };

  return {
    todos: getFilteredTodos(),
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    updateTodoPriority,
    clearCompleted,
    stats
  };
};
