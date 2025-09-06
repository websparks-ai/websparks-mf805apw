import React from 'react';

interface HeaderProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    completionRate: number;
  };
}

const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
          TodoMaster
        </h1>
        <p className="text-secondary-600 text-lg md:text-xl mb-6 font-medium">
          Professional Task Management Made Simple
        </p>
      </div>
      
      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-secondary-200/50">
            <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
            <div className="text-sm text-secondary-600 font-medium">Total Tasks</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-secondary-200/50">
            <div className="text-2xl font-bold text-accent-600">{stats.active}</div>
            <div className="text-sm text-secondary-600 font-medium">Active</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-secondary-200/50">
            <div className="text-2xl font-bold text-success-600">{stats.completed}</div>
            <div className="text-sm text-secondary-600 font-medium">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-secondary-200/50">
            <div className="text-2xl font-bold text-primary-600">{stats.completionRate}%</div>
            <div className="text-sm text-secondary-600 font-medium">Progress</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
