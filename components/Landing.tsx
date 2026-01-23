
import React from 'react';
import soonLogo from '../soon.PNG';

interface LandingProps {
  onApply: () => void;
}

const Landing: React.FC<LandingProps> = ({ onApply }) => {
  return (
    <section className="roku-pattern relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 overflow-hidden text-black">
      {/* Hero Content */}
      <div className="text-center z-10 max-w-4xl mx-auto space-y-8">
        {/* SOON Logo */}
        <div className="relative inline-block">
          <img
            src={soonLogo}
            alt="SOON"
            className="h-32 sm:h-40 md:h-48 w-auto drop-shadow-[0_8px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <div className="space-y-4">
          <p className="text-white text-lg md:text-3xl font-black uppercase tracking-tight max-w-2xl mx-auto leading-none italic drop-shadow-[0_4px_0px_rgba(0,0,0,1)]">
            Are you ready for the ultrafast trading bot? <br/>
            Roku is coming soon, built for speed and made for profits.
          </p>
        </div>

        <button 
          onClick={onApply}
          className="bg-white text-black font-black px-12 py-4 rounded-xl text-2xl brutalist-border brutalist-button uppercase tracking-tighter hover:bg-[#FFD600] transition-colors"
        >
          Apply Whitelist
        </button>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
            <a href="https://x.com/Rokutrade" target="_blank" className="w-14 h-14 bg-white border-4 border-black rounded-xl flex items-center justify-center hover:bg-[#FFD600] transition-colors brutalist-border brutalist-button">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/rokutradebot" target="_blank" className="w-14 h-14 bg-white border-4 border-black rounded-xl flex items-center justify-center hover:bg-[#FFD600] transition-colors brutalist-border brutalist-button">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M11.944 0C5.347 0 0 5.347 0 11.944c0 6.597 5.347 11.944 11.944 11.944 6.597 0 11.944-5.347 11.944-11.944C23.888 5.347 18.541 0 11.944 0zm5.222 8.356c-.194.889-1.944 8.25-2.833 8.722-.556.278-1.222.111-1.722-.278-.444-.333-.778-.667-1.111-1-.278-.278-.5-.556-.222-.889.278-.333 1.222-1.222 2.333-2.333.167-.167.333-.5-.056-.5-.389 0-1.778.889-3.556 2.056-.444.333-.889.5-1.278.5-.444 0-.833-.222-1.278-.389-.556-.222-1-.333-.944-.722.056-.389.556-.556 1.444-.889 3.556-1.556 5.889-2.556 7-3 .444-.167.889-.278 1.111-.278.222.111.389.333.278.722z"/></svg>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
