import { Search, Home, Upload, History, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type View = 'home' | 'report-lost' | 'report-found' | 'matches';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { id: 'home' as View, label: t('nav_home'), icon: Home },
    { id: 'report-lost' as View, label: t('nav_report_lost'), icon: Search },
    { id: 'report-found' as View, label: t('nav_report_found'), icon: Upload },
    { id: 'matches' as View, label: t('nav_matches'), icon: History },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.svg" alt="Mafqood" className="h-10 w-auto" />
          </button>

          {/* Navigation Links + Language Toggle */}
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

            {/* Language Toggle */}
            <div className="flex items-center gap-2 border-l pl-2 sm:pl-4 ml-2 sm:ml-4 border-gray-200">
              <Globe className="w-4 h-4 text-gray-500 hidden sm:block" />
              <button
                type="button"
                className={`text-xs sm:text-sm ${
                  lang === 'en' ? 'font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                className={`text-xs sm:text-sm ${
                  lang === 'ar' ? 'font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setLang('ar')}
              >
                ع
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
