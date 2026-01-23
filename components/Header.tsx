
import React from 'react';

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
        <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="15" fill="white" />
            </svg>
        </div>
        <span className="text-2xl font-black tracking-tighter">ROKU</span>
      </div>
      
      <button className="bg-[#FFD600] text-black font-black px-4 py-2 rounded-lg text-sm md:text-base brutalist-border brutalist-button uppercase italic tracking-tighter transition-all">
        Get Your Referral Code
      </button>
    </header>
  );
};

export default Header;
