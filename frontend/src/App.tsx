import { useState } from 'react';
import Navigation, { View } from './components/Navigation';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import ReportLostView from './views/ReportLostView';
import ReportFoundView from './views/ReportFoundView';
import MatchesView from './views/MatchesView';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'report-lost':
        return <ReportLostView />;
      case 'report-found':
        return <ReportFoundView />;
      case 'matches':
        return <MatchesView />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onNavigate={handleNavigate} />
      <Layout>{renderView()}</Layout>
    </div>
  );
}

export default App;
