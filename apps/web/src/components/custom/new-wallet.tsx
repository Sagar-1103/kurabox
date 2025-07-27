"use client";
import { Key } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewWallet() {
  const router = useRouter();

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Key className="text-[#b8ff4c]" />
          <h2 className="text-2xl font-semibold text-white">
            Create a new wallet
          </h2>
        </div>
        <p className="text-sm md:text-md text-gray-300">
          Generate a new seed phrase to create your multi-chain wallet.
        </p>
      </div>

      <Button
        onClick={() => {
          router.replace("/onboard/done");
          toast.success("Seed phrase generated", {
            description: "Save this seed phrase securely.",
          });
          toast.warning("Never share it online or with anyone you don't trust.");
        }}
        className="w-full bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] font-medium text-md text-black py-3"
      >
        <p>Generate Seed Phrase</p>
      </Button>
    </div>
  );
}
