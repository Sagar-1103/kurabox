"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { checkIsPasswordValid } from "utils/security-functions";
import { savePassword } from "utils/storage";

interface ResetPinProps {
  children: React.ReactNode;
}

export default function ResetPin({ children }: ResetPinProps) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleReset = async() => {
    if (!currentPin || !newPin) {
      toast.error("Please fill in both fields.");
      return;
    }
    console.log(currentPin,newPin);
    const isPasswordValid = await checkIsPasswordValid(currentPin);
    console.log(isPasswordValid);
    if(!isPasswordValid) {
      toast.error("Incorrect current pin.");
      return;
    }
    await savePassword(newPin);
    toast.success("Pin reset successfully!");
    setCurrentPin("");
    setNewPin("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger onClick={() => setOpen(true)} asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-start">
            <KeyRound className="w-5 h-5 text-white mt-1" />
            <div>
              <p className="text-lg font-semibold">Reset PIN</p>
              <p className="text-sm font-normal text-gray-300">
                Enter your current and new pin below
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current PIN"
            onChange={(e)=>setCurrentPin(e.target.value)}
            className="bg-[#14191f] text-sm text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full"
          />

          <input
            type="password"
            placeholder="New PIN"
            onChange={(e)=>setNewPin(e.target.value)}
            className="bg-[#14191f] text-sm text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full"
          />

          <Button disabled={newPin.length<6 || currentPin.length<6} onClick={handleReset} className="mt-3 w-full bg-[#c1f94c] text-black text-sm font-semibold py-2 px-4 rounded-md cursor-pointer">
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
