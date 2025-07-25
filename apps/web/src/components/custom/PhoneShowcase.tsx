import React from "react";
import Image from "next/image";

export default function PhoneShowcase() {
  return (
    <div className="w-full sm:w-[70%] justify-self-center px-10 py-10 flex flex-col md:flex-row items-center min-h-screen justify-center gap-16 text-white">
      <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md aspect-[9/19]">
        <Image src="/iphone.svg" alt="Phone Mockup" fill />
      </div>

      <div className="max-w-xl space-y-6 md:text-start text-center">
        <h2 className="sm:text-6xl text-4xl font-semibold  leading-tight">
          Your Wallet. <span className="text-[#c1f94c]">Always With You.</span>
        </h2>
        <p className="text-gray-300 sm:text-lg">
          Wherever life takes you, commuting, working or unwinding. KuraBox is your
          trusted companion, ensuring your crypto assets are safe, accessible
          and ready whenever you need them. Designed with simplicity and
          reliability in mind, KuraBox brings peace of mind, putting the power of
          digital finance right in the palm of your hand. Experience effortless
          management, seamless access, and the confidence that comes with true
          security, all wrapped into one elegant, intuitive app.
        </p>
      </div>
    </div>
  );
}
