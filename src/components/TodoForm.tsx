import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onAddTodo: (text: string, priority: Todo['priority'], category?: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text, priority, category || undefined);
      setText('');
      setCategory('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  const priorityColors = {
    low: 'text-success-600 bg-success-50 border-success-200',
    medium: 'text-accent-600 bg-accent-50 border-accent-200',
    high: 'text-danger-600 bg-danger-50 border-danger-200'
  };

  return (
    <div className="mb-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-secondary-200/50 p-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What needs to be done today?"
              className="w-full px-4 py-3 text-lg border-2 border-secondary-200 rounded-2xl focus:border-primary-500 focus:outline-none transition-all duration-300 bg-white/80"
            />
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <i className="bi bi-plus-lg text-xl"></i>
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-4 py-2 rounded-xl border-2 font-medium capitalize transition-all duration-200 ${
                      priority === p 
                        ? priorityColors[p]
                        : 'text-secondary-600 bg-secondary-50 border-secondary-200 hover:border-secondary-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">Category (Optional)</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Work, Personal, Shopping"
                className="w-full px-4 py-2 border-2 border-secondary-200 rounded-xl focus:border-primary-500 focus:outline-none transition-all duration-300 bg-white/80"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
