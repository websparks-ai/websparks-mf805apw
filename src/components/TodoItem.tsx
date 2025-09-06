import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onUpdatePriority
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const priorityConfig = {
    low: { color: 'text-success-600', bg: 'bg-success-100', icon: 'bi-arrow-down' },
    medium: { color: 'text-accent-600', bg: 'bg-accent-100', icon: 'bi-dash' },
    high: { color: 'text-danger-600', bg: 'bg-danger-100', icon: 'bi-arrow-up' }
  };

  const config = priorityConfig[todo.priority];

  return (
    <div className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl animate-fade-in ${
      todo.completed 
        ? 'border-success-200 bg-success-50/50' 
        : 'border-secondary-200 hover:border-primary-300'
    }`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? 'bg-success-500 border-success-500 text-white'
                : 'border-secondary-300 hover:border-primary-500 hover:bg-primary-50'
            }`}
          >
            {todo.completed && <i className="bi bi-check text-sm font-bold"></i>}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 text-lg border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none bg-white"
                autoFocus
              />
            ) : (
              <div>
                <p className={`text-lg font-medium transition-all duration-300 ${
                  todo.completed 
                    ? 'text-secondary-500 line-through' 
                    : 'text-secondary-800'
                }`}>
                  {todo.text}
                </p>
                
                <div className="flex items-center gap-3 mt-2">
                  {/* Priority Badge */}
                  <div className="relative">
                    <button
                      onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-200 ${config.color} ${config.bg} hover:opacity-80`}
                    >
                      <i className={`${config.icon} text-xs`}></i>
                      {todo.priority}
                    </button>
                    
                    {showPriorityMenu && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-secondary-200 py-2 z-10 min-w-32">
                        {(['low', 'medium', 'high'] as const).map((priority) => (
                          <button
                            key={priority}
                            onClick={() => {
                              onUpdatePriority(todo.id, priority);
                              setShowPriorityMenu(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-secondary-50 transition-colors duration-200 flex items-center gap-2 ${
                              priorityConfig[priority].color
                            }`}
                          >
                            <i className={`${priorityConfig[priority].icon} text-xs`}></i>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  {todo.category && (
                    <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                      {todo.category}
                    </span>
                  )}

                  {/* Timestamp */}
                  <span className="text-xs text-secondary-500 ml-auto">
                    {todo.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!isEditing && !todo.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                title="Edit task"
              >
                <i className="bi bi-pencil text-lg"></i>
              </button>
            )}
            
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-secondary-500 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-all duration-200"
              title="Delete task"
            >
              <i className="bi bi-trash text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
