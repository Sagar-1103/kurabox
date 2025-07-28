"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChevronRight, Link } from "lucide-react";
import { Token } from "utils/walletUtils";
import ReceiveToken from "./receive-token";

interface ReceiveProps {
  children: React.ReactNode;
  networks: Token[];
}

export default function Receive({ children, networks }: ReceiveProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Select Network
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          {networks.map((network, index) => (
            <ReceiveToken key={index} publicAddress={network.publicKey} chain={network.chain} handleCopy={()=>{}}>
            <div
              key={index}
              className="flex items-center group cursor-pointer hover:scale-101 justify-between bg-[#14191f] border hover:border-gray-500 border-gray-700 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-2 rounded-full">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {network.chain.slice(0, 1).toUpperCase() +
                        network.chain.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {network.publicKey.slice(0, 6)}...
                    {network.publicKey.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 group-hover:text-white text-gray-400 " />
              </div>
            </div>
            </ReceiveToken>

          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
