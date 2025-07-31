import React from "react";
import Image from "next/image";

export default function PhoneShowcase() {
  return (
    <div className="w-full px-4 sm:px-10 py-10 flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-16 min-h-screen text-white">
      <div className="relative w-4/5 sm:w-3/5 md:w-full max-w-[350px] aspect-[9/19]">
        <Image src="/iphone-qr.svg" alt="Phone Mockup" fill className="object-contain" />
      </div>

      <div className="max-w-xl text-center md:text-start space-y-6 px-3 md:px-1">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          Share or receive crypto effortlessly with{" "}
          <span className="text-[#c1f94c]">QR codes.</span>
        </h2>
        <p className="text-gray-300 sm:text-lg">
          Share or receive crypto effortlessly using your unique wallet QR code.
          Whether you're sending funds to a friend or accessing your address
          from another device, simply scan or share your QR code securely. No
          copying, no errors, just seamless transactions every time.
        </p>
      </div>
    </div>
  );
}
