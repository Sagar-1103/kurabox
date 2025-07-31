import React from "react";
import FeatCard from "./feat-card";
import { Rocket, TabletSmartphoneIcon, WalletMinimalIcon } from "lucide-react";

export default function Features() {
  return (
    <div className="flex flex-col lg:flex-row w-full px-10 sm:px-0 sm:w-[70%] min-h-screen justify-self-center pt-32">
      <div className="flex flex-col gap-y-8 md:p-20 md:text-left text-center md:items-start mx-auto items-center w-[100%]">
        <p className="text-4xl font-medium  lg:text-start sm:text-6xl text-center">Unleashing <span className="text-[#c1f94c]">Kura’s Power</span> Through Features</p>
        <p className="text-gray-300 sm:text-lg">
          Kurabox comes equipped with a thoughtfully designed suite of features
          that prioritize the safety, accessibility, and effortless management
          of your crypto assets. Every element is crafted with your security and
          convenience in mind, making Kurabox the wallet you can confidently trust
          for all your digital financial needs.
        </p>
      </div>
      <div className="py-20 flex flex-col sm:text-lg gap-y-8">
            <FeatCard icon={WalletMinimalIcon} title="Secure Key Management" description="Manage your keys locally with HD wallet architecture. Your keys never leave your device, giving you complete control over your crypto."/>
            <FeatCard icon={Rocket} title="Instant Multi-Chain Support" description="Effortlessly manage assets across Solana, Ethereum and more. One wallet, multiple chains zero friction."/>
            <FeatCard icon={TabletSmartphoneIcon} title="Easy Backup & Recovery" description="Seamlessly switch between mobile and web wallets. Sync your experience securely, without compromising control."/>
      </div>
    </div>
  );
}
