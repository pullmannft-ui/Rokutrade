
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 flex flex-col items-center justify-center gap-4 text-center">
       <div className="h-[1px] w-full max-w-4xl bg-gray-200 mb-8"></div>
       <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
         © 2025 ROKUTRADE // BUILT FOR SPEED // MADE FOR PROFIT
       </p>
    </footer>
  );
};

export default Footer;
