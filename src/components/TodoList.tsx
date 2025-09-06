import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onUpdatePriority
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
          <i className="bi bi-check-circle text-4xl text-primary-500"></i>
        </div>
        <h3 className="text-2xl font-bold text-secondary-700 mb-2">All caught up!</h3>
        <p className="text-secondary-500 text-lg">No tasks to show. Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          style={{ animationDelay: `${index * 0.1}s` }}
          className="animate-slide-up"
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdatePriority={onUpdatePriority}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
