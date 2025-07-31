"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChevronLeft, Send } from "lucide-react";
import { Chain, tok, Token } from "utils/walletUtils";
import Image from "next/image";
import { imagePaths } from "utils/image-paths";
import SendTemp from "./send-temp";

interface SendDialogProps {
  children: React.ReactNode;
  networks: Token[];
  balances: { chain: Chain; balance: number }[];
}

export default function SendDialog({
  children,
  networks,
  balances,
}: SendDialogProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Token | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
            {selectedNetwork ? (
              <>
                <button onClick={() => setSelectedNetwork(null)}>
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <p className="text-lg font-semibold">
                  Send{" "}
                  {selectedNetwork.chain.charAt(0).toUpperCase() +
                    selectedNetwork.chain.slice(1)}
                </p>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-white" />
                <div>
                  <p className="text-lg font-semibold">Send Crypto</p>
                  <p className="text-sm font-normal text-gray-300">
                    Choose which network to send from
                  </p>
                </div>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {selectedNetwork ? (
          <SendTemp chain={selectedNetwork.chain} balance={balances.find((b) => b.chain === selectedNetwork.chain)?.balance ?? 0} setOpen={setOpen}/>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {networks.map((network, index) => (
              <button
                key={index}
                onClick={() => setSelectedNetwork(network)}
                className="flex items-center group cursor-pointer hover:scale-101 justify-between bg-[#14191f] border hover:border-gray-500 border-gray-700 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={imagePaths[`${network.chain}`]}
                    width={20}
                    height={20}
                    alt={network.chain}
                    className="w-10 h-10 text-white rounded-full"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {network.chain.charAt(0).toUpperCase() +
                          network.chain.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {network.publicKey.slice(0, 6)}...
                      {network.publicKey.slice(-4)}
                    </p>
                  </div>
                </div>
                <p className="group-hover:text-white text-md text-gray-400">
                  {balances[index]?.balance ?? 0}{" "}
                  {tok[`${network.chain}`]}
                </p>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
