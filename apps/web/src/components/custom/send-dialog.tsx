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
import { Chain, Token } from "utils/walletUtils";
import { Button } from "../ui/button";
import Image from "next/image";
import { imagePaths } from "utils/image-paths";

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

  return (
    <Dialog>
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
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-center w-full">
              <Image
                src={imagePaths[`${selectedNetwork.chain}`]}
                width={20}
                height={20}
                alt={selectedNetwork.chain}
                className="w-20 h-20 text-white rounded-full"
              />
            </div>

            <input
              type="text"
              placeholder={`Recipient's ${selectedNetwork.chain} address`}
              className="mt-4 bg-[#14191f] text-sm text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full"
            />

            <div className="flex items-center mt-2 border border-gray-700 bg-[#14191f] rounded-md overflow-hidden">
              <input
                type="number"
                className="flex-1 px-4 w-full py-2 bg-transparent text-white placeholder-gray-400 text-sm"
                placeholder="0"
                max={balances.find((b) => b.chain === selectedNetwork.chain)
                  ?.balance ?? 0}
              />
              <span className="px-3 text-sm text-white">
                {selectedNetwork.chain.slice(0, 3).toUpperCase()}
              </span>
              <button className="px-3 py-2 text-xs font-medium bg-[#c1f94c] text-black rounded-l-none rounded-md">
                Max
              </button>
            </div>

            <div className="text-xs text-gray-400 flex justify-end mt-1">
              <span>
                Available{" "}
                {balances.find((b) => b.chain === selectedNetwork.chain)
                  ?.balance ?? 0}{" "}
                {selectedNetwork.chain.slice(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="mx-auto w-full">
              <Button className="mt-3 w-full bg-[#c1f94c] text-black text-sm font-semibold py-2 px-4 rounded-md cursor-pointer">
                Send
              </Button>
            </div>
          </div>
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
                  {network.chain.slice(0, 3).toUpperCase()}
                </p>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
