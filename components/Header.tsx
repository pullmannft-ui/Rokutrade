
import React from 'react';
import rokuLogo from '../roku.PNG';

interface HeaderProps {
  onNavigateLanding: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateLanding }) => {
  return (
    <header className="w-full bg-white border-b-2 border-black px-4 md:px-8 py-4 flex justify-between items-center z-50 sticky top-0">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={onNavigateLanding}
      >
        <img
          src={rokuLogo}
          alt="ROKU"
          className="h-9 md:h-10 w-auto"
        />
      </div>
      
      <button className="bg-[#FFD600] text-black font-black px-4 py-2 rounded-lg text-sm md:text-base brutalist-border brutalist-button uppercase italic tracking-tighter transition-all">
        Get Your Referral Code
      </button>
    </header>
  );
};

export default Header;
