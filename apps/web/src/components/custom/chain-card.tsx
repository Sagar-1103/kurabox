import { Check, CopyIcon, DownloadIcon, Link, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReceiveToken from "./receive-token";
import { Token } from "utils/walletUtils";
import { toast } from "sonner";

interface ChainCardProps {
  token: Token;
  balance:number;
}

export default function ChainCard({ token,balance }: ChainCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(token.publicKey)
        .then(() => {
          setCopied(true);
          toast.success("Address Copied", {
            description: "Wallet public address copied to clipboard.",
          });
          setTimeout(() => setCopied(false), 1000);
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = token.publicKey;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (success) {
        setCopied(true);
        toast.success("Address Copied", {
          description: "Wallet public address copied to clipboard.",
        });
        setTimeout(() => setCopied(false), 1000);
      } else {
        throw new Error("Fallback copy failed");
      }
    } catch (err) {
      toast.error("Copy failed", {
        description: "Please manually copy the phrase.",
      });
    }
  };

  return (
    <div className="bg-[#0b0c10] rounded-2xl p-6 shadow-xl hover:scale-101 transition border border-[#1a1a1a] w-[340px] text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-2 rounded-full">
            <Link className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {token?.chain.slice(0, 1).toUpperCase() + token?.chain.slice(1)}
            </h2>
            <p className="text-sm text-gray-400">
              {token.publicKey.slice(0, 7) + "..."}
            </p>
          </div>
        </div>
        <span className="text-sm bg-[#1f1f1f] px-3 py-1 rounded-full">
          {token?.chain.slice(0, 3).toUpperCase()}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Balance</span>
          <span className="text-white font-medium">
            {balance} {token?.chain.slice(0, 3).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="border-t border-[#1f1f1f] my-4" />

      <div className="flex justify-between mb-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm hover:bg-[#1e1e1e] px-3 py-2 rounded-lg transition"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" /> Copied
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" /> Copy
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 hover:bg-[#c1f94c] hover:text-black py-2 rounded-lg border border-gray-700 transition">
          <SendIcon className="w-4 h-4" /> Send
        </button>

        <ReceiveToken chain={token.chain} publicAddress={token.publicKey} handleCopy={handleCopy}>
          <button className="flex items-center justify-center gap-2 hover:bg-[#c1f94c] hover:text-black py-2 rounded-lg border border-gray-700 transition">
            <DownloadIcon className="w-4 h-4" /> Receive
          </button>
        </ReceiveToken>
      </div>
    </div>
  );
}
