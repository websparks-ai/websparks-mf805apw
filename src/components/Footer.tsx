import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-secondary-200/50">
          <div className="flex items-center justify-center gap-2 text-secondary-600">
            <span className="text-sm font-medium">Powered by</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <i className="bi bi-lightning-fill text-white text-xs"></i>
              </div>
              <span className="font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Websparks AI
              </span>
            </div>
          </div>
          <p className="text-xs text-secondary-500 mt-2">
            Professional task management made simple and beautiful
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
