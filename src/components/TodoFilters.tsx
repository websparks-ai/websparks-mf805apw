import React from 'react';
import { FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortType;
  setSortBy: (sort: SortType) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  onClearCompleted,
  completedCount
}) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: 'All Tasks', icon: 'bi-list-ul' },
    { key: 'active' as FilterType, label: 'Active', icon: 'bi-circle' },
    { key: 'completed' as FilterType, label: 'Completed', icon: 'bi-check-circle' }
  ];

  const sortOptions = [
    { key: 'created' as SortType, label: 'Date Created', icon: 'bi-calendar' },
    { key: 'priority' as SortType, label: 'Priority', icon: 'bi-exclamation-triangle' },
    { key: 'alphabetical' as SortType, label: 'Alphabetical', icon: 'bi-sort-alpha-down' }
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {filterButtons.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              filter === key
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                : 'bg-white/80 text-secondary-700 border-2 border-secondary-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <i className={`${icon} text-lg`}></i>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Sort and Clear Controls */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-secondary-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-4 py-2 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none bg-white/80 text-secondary-700 font-medium"
          >
            {sortOptions.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 text-danger-600 hover:text-danger-700 font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <i className="bi bi-trash text-lg"></i>
            <span className="hidden sm:inline">Clear Completed ({completedCount})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;
