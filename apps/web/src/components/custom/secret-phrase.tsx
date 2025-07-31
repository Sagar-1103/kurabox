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
import { Copy, Key } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { checkIsPasswordValid } from "utils/security-functions";
import { getSeedPhrase } from "utils/storage";
import { handleCopy } from "utils/copy";

interface SecretPhraseProps {
  onRegenerate?: () => void;
  children: React.ReactNode;
}

export default function SecretPhrase({
  onRegenerate,
  children,
}: SecretPhraseProps) {
  const [copied, setCopied] = useState(false);
  const [pin, setPin] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [phrase,setPhrase] = useState("");

  const handleCheckPin = async()=>{
    const isPinCorrect = await checkIsPasswordValid(pin);
    if(isPinCorrect) {
      const recoveryPhrase = await getSeedPhrase();
      if (recoveryPhrase) {
        setPhrase(recoveryPhrase.trim());
        setShowPhrase(true);
        setPin("");
      }
    } else {
      toast.error("Incorrect pin.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-start">
            <Key className="w-5 h-5 text-[#c1f94c] mt-1" />
            <div>
              <p className="text-lg font-semibold">Your Secret Phrase</p>
              <p className="text-sm font-normal text-gray-300">
                Enter your 6-digit PIN to view the seed phrase.
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {!showPhrase ? (
          <div className="mt-4 space-y-4">
            <Input
              type="password"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="bg-[#14191f] border border-gray-700 text-white"
            />
            <Button
              onClick={handleCheckPin}
              disabled={pin.length < 6}
              className="bg-[#c1f94c] text-black font-semibold text-sm py-2 px-4 rounded-md w-full"
            >
              Show Phrase
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-4 bg-[#14191f] border border-gray-700 p-4 rounded-lg grid grid-cols-3 gap-2 text-sm text-white tracking-wide select-text">
              {phrase.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="bg-[#1c2129] px-3 py-2 rounded-md text-center border border-[#2a2f36]"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={()=>handleCopy(phrase,setCopied,{title:"Copied to clipboard",description:"Seed phrase has been copied to your clipboard."})}
                className="bg-[#c1f94c] text-black font-semibold text-sm py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Phrase"}
              </Button>

              {onRegenerate && (
                <Button
                  onClick={onRegenerate}
                  className="bg-transparent border border-[#c1f94c] text-[#c1f94c] hover:bg-[#c1f94c20] font-semibold text-sm py-2 px-4 rounded-md"
                >
                  Regenerate Phrase
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
