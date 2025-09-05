'use client';

import { ReactNode } from 'react';
import { Home, Search, User, Settings2 } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentPage?: string;
}

export function AppShell({ children, currentPage = 'home' }: AppShellProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings2, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative">
      {/* Floating background elements */}
      <div className="floating-elements" />
      
      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KR</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">KnowYourRightsAI</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 glass-card rounded-lg hover:bg-opacity-15 transition-all duration-200">
              <Home className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-2 glass-card rounded-lg hover:bg-opacity-15 transition-all duration-200">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="btn-primary text-sm px-4 py-2">
              Get Help
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-20">
        <div className="max-w-xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 p-4">
        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-xl p-2">
            <div className="flex items-center justify-around">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
