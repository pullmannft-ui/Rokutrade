
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const WhitelistForm: React.FC = () => {
  const [handle, setHandle] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLikedRt, setIsLikedRt] = useState(false);
  const [checkingFollow, setCheckingFollow] = useState(false);
  const [checkingLike, setCheckingLike] = useState(false);
  
  const [tweetLink, setTweetLink] = useState('');
  const [evmWallet, setEvmWallet] = useState('');
  const [solWallet, setSolWallet] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!/^@[\w]{1,15}$/.test(handle)) {
      newErrors.handle = "Handle must start with @ and be valid.";
    }
    
    if (!isFollowing) {
      newErrors.follow = "Please verify that you follow @Rokutrade.";
    }
    
    if (!isLikedRt) {
      newErrors.like = "Please verify that you liked and retweeted.";
    }

    try {
      const url = new URL(tweetLink);
      if (!url.hostname.includes('twitter.com') && !url.hostname.includes('x.com')) {
        newErrors.tweetLink = "Link must be a valid X/Twitter URL.";
      }
    } catch {
      newErrors.tweetLink = "Please enter a valid URL.";
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(evmWallet)) {
      newErrors.evmWallet = "Invalid EVM address (must start with 0x).";
    }

    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(solWallet)) {
      newErrors.solWallet = "Invalid Solana address format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateCheck = (type: 'follow' | 'like') => {
    if (type === 'follow') {
      setCheckingFollow(true);
      setTimeout(() => {
        setCheckingFollow(false);
        setIsFollowing(true);
      }, 1500);
    } else {
      setCheckingLike(true);
      setTimeout(() => {
        setCheckingLike(false);
        setIsLikedRt(true);
      }, 1500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        await addDoc(collection(db, 'whitelistEntries'), {
          handle,
          tweetLink,
          evmWallet,
          solWallet,
          isFollowing,
          isLikedRt,
          createdAt: serverTimestamp(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error('Failed to submit whitelist entry', error);
        setSubmitError('Submission failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const shareToX = () => {
    const text = encodeURIComponent("I just joined the @Rokutrade Whitelist! ⚡ Speed, Profit, ROKU. The ultrafast trading bot is here. Join now: t.me/rokutradebot #ROKU #TradingBot");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-10 md:mt-20 text-center animate-in fade-in zoom-in duration-500">
         <div className="w-24 h-24 bg-[#FFD600] brutalist-border rounded-full flex items-center justify-center mb-8 animate-bounce">
           <svg viewBox="0 0 24 24" className="w-12 h-12 fill-black"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
         </div>
         <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black">SUCCESS!</h2>
         <p className="text-xl font-bold mb-12 max-w-md uppercase tracking-tight text-gray-700">
           Your mission is complete. Your wallets are now whitelisted for the ROKU engine.
         </p>
         
         <div className="flex flex-col gap-6 w-full max-w-sm">
            <button 
              onClick={shareToX}
              className="bg-black text-white font-black py-5 px-8 rounded-2xl text-xl brutalist-border brutalist-button uppercase tracking-tighter flex items-center justify-center gap-3 transition-all hover:bg-[#1DA1F2]"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share & Confirm on X
            </button>
            
            <a 
              href="https://t.me/rokutradebot" 
              target="_blank"
              className="bg-[#FFD600] text-black font-black py-5 px-8 rounded-2xl text-xl brutalist-border brutalist-button uppercase tracking-tighter flex items-center justify-center gap-3 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M11.944 0C5.347 0 0 5.347 0 11.944c0 6.597 5.347 11.944 11.944 11.944 6.597 0 11.944-5.347 11.944-11.944C23.888 5.347 18.541 0 11.944 0zm5.222 8.356c-.194.889-1.944 8.25-2.833 8.722-.556.278-1.222.111-1.722-.278-.444-.333-.778-.667-1.111-1-.278-.278-.5-.556-.222-.889.278-.333 1.222-1.222 2.333-2.333.167-.167.333-.5-.056-.5-.389 0-1.778.889-3.556 2.056-.444.333-.889.5-1.278.5-.444 0-.833-.222-1.278-.389-.556-.222-1-.333-.944-.722.056-.389.556-.556 1.444-.889 3.556-1.556 5.889-2.556 7-3 .444-.167.889-.278 1.111-.278.222.111.389.333.278.722z"/></svg>
              Try ROKU Bot
            </a>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 animate-in slide-in-from-bottom duration-700">
      <div className="text-center mb-10">
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Whitelist</h1>
        <p className="text-black font-black uppercase text-sm tracking-[0.2em] italic bg-[#FFD600] inline-block px-4 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">Secure your legacy</p>
      </div>

      <div className="bg-white brutalist-border p-6 md:p-10 rounded-2xl space-y-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* STEP 1: X Handle */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
               <span className="bg-black text-white px-2 py-0.5 rounded italic">Step 1</span> Your X Handle
            </label>
            <input 
              type="text"
              placeholder="@USERNAME"
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
                if (errors.handle) setErrors({...errors, handle: ''});
              }}
              className={`w-full bg-[#F3F4F6] brutalist-border rounded-xl p-4 text-xl font-black placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${errors.handle ? 'border-red-600' : 'border-black'}`}
            />
            {errors.handle && <p className="text-red-600 text-[10px] font-black uppercase italic">{errors.handle}</p>}
          </div>

          {/* STEP 2: Verification */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
               <span className="bg-black text-white px-2 py-0.5 rounded italic">Step 2</span> Verification
            </label>
            
            {/* Follow Task */}
            <div className={`brutalist-border rounded-xl p-4 flex items-center justify-between transition-all ${isFollowing ? 'bg-[#D1FAE5]' : 'bg-gray-50'}`}>
               <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded flex items-center justify-center border-2 border-black ${isFollowing ? 'bg-black' : 'bg-[#FFD600]'}`}>
                   {isFollowing ? <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> : <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                 </div>
                 <div className="flex flex-col">
                   <span className="font-black text-lg italic uppercase leading-none">Follow @Rokutrade</span>
                   <a href="https://x.com/Rokutrade" target="_blank" className="text-[10px] text-blue-600 underline font-black uppercase italic mt-1">Visit Profile</a>
                 </div>
               </div>
               
               <button 
                type="button"
                onClick={() => simulateCheck('follow')}
                disabled={isFollowing || checkingFollow}
                className={`px-4 py-2 rounded-lg font-black uppercase text-xs brutalist-border brutalist-button transition-all ${isFollowing ? 'bg-green-500 cursor-default shadow-none translate-x-[4px] translate-y-[4px]' : 'bg-white hover:bg-[#FFD600]'}`}
               >
                 {checkingFollow ? '...' : isFollowing ? 'Done' : 'Verify'}
               </button>
            </div>

            {/* Like & RT Task */}
            <div className={`brutalist-border rounded-xl p-4 flex items-center justify-between transition-all ${isLikedRt ? 'bg-[#D1FAE5]' : 'bg-gray-50'}`}>
               <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded flex items-center justify-center border-2 border-black ${isLikedRt ? 'bg-black' : 'bg-[#FFD600]'}`}>
                    {isLikedRt ? <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> : <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                 </div>
                 <div className="flex flex-col">
                   <span className="font-black text-lg italic uppercase leading-none">Like & RT Last Post</span>
                   <a href="https://x.com/Rokutrade" target="_blank" className="text-[10px] text-blue-600 underline font-black uppercase italic mt-1">Go to Post</a>
                 </div>
               </div>

               <button 
                type="button"
                onClick={() => simulateCheck('like')}
                disabled={isLikedRt || checkingLike}
                className={`px-4 py-2 rounded-lg font-black uppercase text-xs brutalist-border brutalist-button transition-all ${isLikedRt ? 'bg-green-500 cursor-default shadow-none translate-x-[4px] translate-y-[4px]' : 'bg-white hover:bg-[#FFD600]'}`}
               >
                 {checkingLike ? '...' : isLikedRt ? 'Done' : 'Verify'}
               </button>
            </div>
            {(errors.follow || errors.like) && <p className="text-red-600 text-[10px] font-black uppercase italic">Action Required.</p>}
          </div>

          {/* STEP 3: Proof of Tweet */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                 <span className="bg-black text-white px-2 py-0.5 rounded italic">Step 3</span> Proof of Tweeting
              </label>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight italic">
                You must tweet the exact message below, including the mention of <span className="text-black font-black">@Rokutrade</span> and the <span className="text-black font-black">t.me link</span>. Paste your tweet URL after posting.
              </p>
            </div>

            <div className="bg-[#FFF8E1] p-4 border-[3px] border-black rounded-xl mb-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] relative">
                <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2">Required Tweet Content:</p>
                <p className="text-sm font-black text-black uppercase italic leading-tight select-all cursor-pointer hover:text-blue-600" title="Click to select all">
                  "Speed is coming with @Rokutrade! 🚀 Join the fastest trading bot whitelist here: t.me/rokutradebot"
                </p>
            </div>
            
            <input 
              type="url"
              placeholder="Paste your X status URL here (e.g., https://x.com/...)"
              value={tweetLink}
              onChange={(e) => {
                setTweetLink(e.target.value);
                if (errors.tweetLink) setErrors({...errors, tweetLink: ''});
              }}
              className={`w-full bg-[#F3F4F6] brutalist-border rounded-xl p-4 text-lg font-black placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${errors.tweetLink ? 'border-red-600' : 'border-black'}`}
            />
            {errors.tweetLink && <p className="text-red-600 text-[10px] font-black uppercase italic">{errors.tweetLink}</p>}
          </div>

          {/* STEP 4: Wallets */}
          <div className="space-y-6">
            <label className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
               <span className="bg-black text-white px-2 py-0.5 rounded italic">Step 4</span> Settlement Wallets
            </label>
            
            <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">EVM Wallet (0x...)</p>
                <input 
                  type="text"
                  placeholder="0x..."
                  value={evmWallet}
                  onChange={(e) => {
                    setEvmWallet(e.target.value);
                    if (errors.evmWallet) setErrors({...errors, evmWallet: ''});
                  }}
                  className={`w-full bg-[#F3F4F6] brutalist-border rounded-xl p-4 text-lg font-black placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${errors.evmWallet ? 'border-red-600' : 'border-black'}`}
                />
                {errors.evmWallet && <p className="text-red-600 text-[10px] font-black uppercase italic">{errors.evmWallet}</p>}
            </div>

            <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">Solana Wallet</p>
                <input 
                  type="text"
                  placeholder="Solana address"
                  value={solWallet}
                  onChange={(e) => {
                    setSolWallet(e.target.value);
                    if (errors.solWallet) setErrors({...errors, solWallet: ''});
                  }}
                  className={`w-full bg-[#F3F4F6] brutalist-border rounded-xl p-4 text-lg font-black placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${errors.solWallet ? 'border-red-600' : 'border-black'}`}
                />
                {errors.solWallet && <p className="text-red-600 text-[10px] font-black uppercase italic">{errors.solWallet}</p>}
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#FFD600] text-black font-black py-6 rounded-2xl text-2xl uppercase tracking-tighter flex items-center justify-center gap-3 brutalist-border brutalist-button transition-all disabled:opacity-50`}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Locking In...</span>
            ) : (
              <>
                Finalize My Entry
                <svg viewBox="0 0 24 24" className="w-8 h-8"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </>
            )}
          </button>
          {submitError && (
            <p className="text-red-600 text-xs font-black uppercase italic text-center">
              {submitError}
            </p>
          )}

        </form>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-16 opacity-20">
         <span className="text-black font-black italic uppercase tracking-widest text-lg md:text-3xl">Built for speed</span>
         <span className="text-black font-black italic uppercase tracking-widest text-lg md:text-3xl">Made for profits</span>
         <span className="text-black font-black italic uppercase tracking-widest text-lg md:text-3xl">Ultrafast trading bot</span>
      </div>
    </div>
  );
};

export default WhitelistForm;
