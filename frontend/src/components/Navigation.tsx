import { Search, Home, Upload, History } from 'lucide-react';

export type View = 'home' | 'report-lost' | 'report-found' | 'matches';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as View, label: 'Home', icon: Home },
    { id: 'report-lost' as View, label: 'Report Lost', icon: Search },
    { id: 'report-found' as View, label: 'Report Found', icon: Upload },
    { id: 'matches' as View, label: 'Matches / History', icon: History },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="hidden sm:inline">Dubai AI Lost & Found</span>
            <span className="sm:hidden">Dubai L&F</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
