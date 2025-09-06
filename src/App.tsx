import React, { useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

function App() {
  const {
    todos,
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
  } = useTodos();

  // Close priority menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      // This will be handled by individual TodoItem components
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 font-primary">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent-200 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Header stats={stats} />
          
          <TodoForm onAddTodo={addTodo} />
          
          {stats.total > 0 && (
            <TodoFilters
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearCompleted={clearCompleted}
              completedCount={stats.completed}
            />
          )}
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdatePriority={updateTodoPriority}
          />
          
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
