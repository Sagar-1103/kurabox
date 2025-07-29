"use client";
import React, { useState } from "react";
import { Key } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkIsPasswordValid } from "utils/security-functions";
import { useRouter } from "next/navigation";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleUnlock = async()=>{
    const isPasswordValid = await checkIsPasswordValid(password);
    if (!isPasswordValid) {
      toast.error("Incorrect pin.");
      return;
    }
    localStorage.setItem('locked',"false");
    router.replace("/wallet");
  }

  return (
    <div className="w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-md mx-auto min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-12 mx-auto w-full">
        <div className="bg-[#0e131b] w-[100%] mt-6 px-6 py-8 rounded-lg shadow-lg space-y-6">
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-x-2">
                <Key className="text-[#b8ff4c]" />
                <h2 className="text-2xl font-semibold text-white">
                  Unlock Wallet
                </h2>
              </div>
              <p className="text-sm md:text-md text-gray-300">
                Enter your pin to unlock your wallet.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                className={`focus-visible:ring-0 py-3 ${password === "" ? "" : "md:text-2xl"} border-[#3c3838] text-center bg-[#2e3339]`}
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              disabled={password.length < 6}
              onClick={handleUnlock}
              className="w-full bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] font-medium text-md text-black py-3"
            >
              <p>Unlock Wallet</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
