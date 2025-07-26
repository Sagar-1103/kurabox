"use client";
import ExistingWallet from "@/components/custom/existing-wallet";
import NewWallet from "@/components/custom/new-wallet";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import React, { useState } from "react";

export default function Onboard() {
  const [action, setAction] = useState<"new" | "existing">("new");

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-12 mx-auto w-full">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-gradient-to-b from-[#c1f94c] to-[#fcd44c] rounded-2xl shadow-lg">
          <Wallet size={30} className="text-black font-bold" />
        </div>
        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] bg-clip-text text-transparent my-4">
          KuraBox
        </p>
        <p className="text-sm md:text-base text-gray-300">
          All your favorite networks, one seamless start
        </p>
      </div>

      <div className="flex flex-col sm:flex-row bg-[#151c29] rounded-lg mt-10 overflow-hidden w-[100%]">
        <Button
          onClick={() => setAction("new")}
          className={`sm:w-1/2 w-full py-3 ${action === "new" ? "bg-[#b8ff4c] text-black" : "text-gray-200"}`}
        >
          Create New Wallet
        </Button>
        <Button
          onClick={() => setAction("existing")}
          className={`sm:w-1/2 w-full py-3 ${action === "existing" ? "bg-[#b8ff4c] text-black" : "text-gray-200"}`}
        >
          Import Existing
        </Button>
      </div>

      <div className="bg-[#0e131b] w-[100%] mt-6 px-6 py-8 rounded-lg shadow-lg space-y-6">
        {action === "new" ? <NewWallet /> : <ExistingWallet />}
      </div>
    </div>
  );
}
