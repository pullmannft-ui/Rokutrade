
import React from 'react';
import Header from './components/Header';
import WhitelistForm from './components/WhitelistForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2]">
      <Header />

      <main className="flex-grow">
        <WhitelistForm />
      </main>

      <Footer />
    </div>
  );
};

export default App;
