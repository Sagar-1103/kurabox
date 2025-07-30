"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChevronLeft } from "lucide-react";
import { Chain } from "utils/walletUtils";
import { Button } from "../ui/button";
import Image from "next/image";
import { imagePaths } from "utils/image-paths";
import { sendSolana } from "utils/send-sol";
import { toast } from "sonner";
import { sendEth } from "utils/send-ether";

interface SendTokenProps {
  children: React.ReactNode;
  chain: Chain;
  balance: number;
}

export default function SendToken({
  children,
  chain,
  balance,
}: SendTokenProps) {
  const [publicAddress, setPublicAddress] = useState("");
  const [quantity, setQuantity] = useState(0);

  const sendToken = async () => {
    try {
      let transactionSignature;
      if (!publicAddress || !quantity) {
        toast.error("Provide all the fields.");
      }
      if (quantity > balance) {
        toast.error("You don't have sufficient funds.");
      }

      try {
        if (chain === "solana") {
          transactionSignature = await sendSolana(publicAddress, quantity);
        } else if (chain==="ethereum"){
          transactionSignature = await sendEth(publicAddress,quantity);
        }

        toast.success(`Sent ${quantity} ${chain.slice(0,3).toUpperCase()} to ${publicAddress.slice(0, 6)}...${publicAddress.slice(-4)}`,{
          description:"Changes may take time to propagate"
        });
      } catch (error) {
        toast.error("Some error occured.");
      }
    } catch (error) {
      console.log(`Error sending ${chain}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
            <>
              <button>
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <p className="text-lg font-semibold">
                Send {chain.charAt(0).toUpperCase() + chain.slice(1)}
              </p>
            </>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-center w-full">
            <Image
              src={imagePaths[`${chain}`]}
              width={20}
              height={20}
              alt={chain}
              className="w-20 h-20 text-white rounded-full"
            />
          </div>

          <input
            type="text"
            placeholder={`Recipient's ${chain} address`}
            value={publicAddress}
            onChange={(e) => setPublicAddress(e.target.value.trim())}
            className="mt-4 bg-[#14191f] text-sm text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full"
          />

          <div className="flex items-center mt-2 border border-gray-700 bg-[#14191f] rounded-md overflow-hidden">
            <input
              type="number"
              min={0}
              max={balance}
              step={0.01} // Optional: control decimal step
              className="flex-1 px-4 w-full py-2 bg-transparent text-white placeholder-gray-400 text-sm"
              placeholder="0"
              value={quantity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (e.target.value === "") {
                  setQuantity(0); // Treat empty as 0
                } else if (!isNaN(val)) {
                  const clamped = Math.max(0, Math.min(balance, val));
                  setQuantity(clamped);
                }
              }}
            />
            <span className="px-3 text-sm text-white">
              {chain.slice(0, 3).toUpperCase()}
            </span>
            <button className="px-3 py-2 text-xs font-medium bg-[#c1f94c] text-black rounded-l-none rounded-md">
              Max
            </button>
          </div>

          <div className="text-xs text-gray-400 flex justify-end mt-1">
            <span>
              Available {balance ?? 0} {chain.slice(0, 3).toUpperCase()}
            </span>
          </div>
          <div className="mx-auto w-full">
            <Button
              onClick={sendToken}
              disabled={quantity>balance || !quantity || !publicAddress}
              className="mt-3 w-full bg-[#c1f94c] text-black text-sm font-semibold py-2 px-4 rounded-md cursor-pointer"
            >
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
