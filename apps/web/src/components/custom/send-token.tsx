"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Chain } from "utils/walletUtils";
import SendTemp from "./send-temp";

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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
            <>
              <p className="text-lg font-semibold">
                Send {chain.charAt(0).toUpperCase() + chain.slice(1)}
              </p>
            </>
          </DialogTitle>
        </DialogHeader>
          <SendTemp chain={chain} balance={balance} setOpen={setOpen}/>

      </DialogContent>
    </Dialog>
  );
}
