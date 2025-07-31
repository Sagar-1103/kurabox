"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Key, Copy, Check, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveSeedPhrase } from "utils/storage";
import {generateMnemonic} from "bip39";
import { handleCopy } from "utils/copy";

export default function Done() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const router = useRouter();
  const mnemonics = generateMnemonic();

  useEffect(()=>{
    setSecretPhrase(mnemonics);
  },[])

  return (
    <div className="w-full mx-auto bg-[#0e131b] mt-6 px-6 py-8 rounded-lg shadow-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Key className="text-[#b8ff4c]" />
            <h2 className="text-2xl font-semibold text-white">
              Secret Recovery Phrase
            </h2>
          </div>
        </div>
        <p className="text-sm md:text-md text-yellow-300">
          This phrase is the only way to recover your wallet. Do not share it
          with anyone!
        </p>
      </div>

      <div className="flex justify-end my-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSecret((prev) => !prev)}
          className="text-xs text-gray-300 hover:text-white gap-1"
        >
          {!showSecret ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={()=>handleCopy(secretPhrase,setCopied,{title:"Copied to clipboard",description:"Seed phrase has been copied to your clipboard."})}
          className="text-xs text-gray-300 hover:text-white gap-1"
        >
          {copied ? (
            <div className="flex gap-x-1">
              <Check size={16} />
            </div>
          ) : (
            <div className="flex gap-x-1">
              <Copy size={16} />
            </div>
          )}
        </Button>
      </div>
      <div className={`${!showSecret ? "blur-xs" : "blur-none"}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {secretPhrase &&
            secretPhrase
              .split(" ")
              .map((word, index) => (
                <input
                  key={index}
                  type="text"
                  disabled
                  readOnly
                  value={`${index + 1}.  ${word}`}
                  className="w-full p-2 rounded-md bg-[#151c29] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8ff4c]"
                />
              ))}
        </div>
      </div>

      <label className="flex items-center gap-2 my-4 text-sm text-gray-300">
        <Checkbox
          checked={acknowledged}
          onCheckedChange={() => setAcknowledged(!acknowledged)}
        />
        I saved my recovery phrase.
      </label>

      <Button
        disabled={!acknowledged}
        onClick={async() => {
          await saveSeedPhrase(secretPhrase);
          localStorage.setItem('isSeed',"true");
          router.replace("/wallet");
          toast.success("Wallet created successfully", {
            description: "Your multi-chain wallet is ready to use.",
          });
        }}
        className="w-full bg-gradient-to-r from-[#c1f94c] to-[#24db67] text-black py-3 text-md font-medium"
      >
        Create Wallet
      </Button>
    </div>
  );
}
