'use client'
import { useState } from 'react';

// Example using Tailwind (Standard for Next.js)
export default function LiteTikTok({ vidid }: { vidid: string }) {
  const [loadVideo, setLoadVideo] = useState(false);
  const thumbnailUrl = `https://www.tiktok.com/api/img/?itemId=${vidid}&location=0`;
  console.log(loadVideo)
  return (
    <div className="w-full max-w-[325px] mx-auto rounded-lg overflow-hidden bg-[#b4b4b4] relative">
      {!loadVideo ? (
    <div 
      onClick={() => {
        console.log('clicked')
        setLoadVideo(true)
      }}
      className="relative z-10 pointer-events-auto cursor-pointer w-full aspect-[9/16] bg-cover bg-center flex items-center justify-center border-4 border-red-500"
        >
          <div className="bg-white/80 rounded-full w-[50px] h-[50px] flex items-center justify-center text-xl">
            ▶
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.tiktok.com/player/v1/${vidid}?autoplay=1`}
          className="w-full aspect-[9/16] border-none"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}
