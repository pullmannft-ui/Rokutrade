
import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import WhitelistForm from './components/WhitelistForm';
import Footer from './components/Footer';

export enum View {
  LANDING = 'LANDING',
  WHITELIST = 'WHITELIST'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2]">
      <Header onNavigateLanding={() => setCurrentView(View.LANDING)} />
      
      <main className="flex-grow">
        {currentView === View.LANDING ? (
          <Landing onApply={() => setCurrentView(View.WHITELIST)} />
        ) : (
          <WhitelistForm />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
