"use client";
import React, { useState } from "react";

export default function Trial() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen text-white px-6 md:px-20 py-24 flex flex-col w-full sm:w-[70%] justify-self-center items-center justify-center gap-16">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl sm:text-6xl md:text-5xl font-semibold leading-tight">
          Try the <span className="text-[#c1f94c]">KuraBox</span> Trial
        </h1>
        <p className="mt-4 text-gray-300 sm:text-lg">
          Watch the video and see how easy it is to manage your crypto assets
          securely. You can get the trial here.
        </p>
      </div>

      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
        {!isPlaying ? (
          <button
            aria-label="Play Demo Video"
            onClick={() => setIsPlaying(true)}
            className="w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/50 transition duration-200 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-20 h-20 text-white/80 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.337v7.326a1 1 0 001.234.97l6.518-1.539A1 1 0 0015 13.91v-2.572a1 1 0 00-.248-.17z"
              />
            </svg>
          </button>
        ) : (
          <video
            src="/kura-trial-demo.mp4"
            controls
            autoPlay
            className="w-full h-full object-cover rounded-xl"
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}
