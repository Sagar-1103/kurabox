"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy, DownloadIcon, QrCode, Share2 } from "lucide-react";
import { Input } from "../ui/input";
import { useQRCode } from "next-qrcode";

interface ReceiveTokenProps {
  publicAddress: string;
  handleCopy:()=>void;
}

export default function ReceiveToken({ publicAddress,handleCopy }: ReceiveTokenProps) {
  const { SVG } = useQRCode();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-700 bg-transparent text-white hover:bg-[#c1f94c] hover:text-black transition-colors">
          <DownloadIcon className="w-4 h-4" />
          Receive
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2 font-semibold">
            <QrCode className="w-5 h-5 text-purple-400" />
            Receive SOL
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-gray-400 mt-1">
            Share this address to receive Solana
          </p>
        </DialogHeader>

        <div className="w-[220px] h-[220px] mx-auto border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center mt-6">
          {!publicAddress ? (
            <>
              <QrCode className="text-gray-600 w-8 h-8 mb-2" />
              <span className="text-gray-500 text-sm text-center leading-tight">
                QR Code
                <br />
                Would generate here
              </span>
            </>
          ) : (
            <SVG
              text={publicAddress}
              options={{
                margin: 2,
                width: 200,
                color: {
                  dark: "#000000ff",
                  light: "#ffffffff",
                },
              }}
            />
          )}
        </div>

        <div className="mt-5 w-full">
          <label className="text-sm block text-gray-400 mb-2">
            Wallet Address
          </label>
          <div className="flex items-center gap-2">
            <Input
              className="flex-1 bg-zinc-900 text-white border border-gray-700 text-sm px-3 py-2"
              value={publicAddress}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="mt-4 bg-[#232217] text-yellow-300 text-xs border-yellow-600/70 border-1 p-3 rounded-lg leading-relaxed">
          <span className="font-semibold">Important:</span> Only send SOL to
          this address on the Solana network. Sending tokens from other networks
          may result in permanent loss.
        </div>

        <div className="mt-5 flex flex-row gap-3">
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-1/2 cursor-pointer text-white border-gray-600 hover:bg-[#c1f94c] hover:text-black"
            onClick={handleCopy}
          >
            <Copy size={16} className="mr-2" />
            Copy Address
          </Button>
          <Button
            variant="outline"
            size={"lg"}
            className="w-1/2 cursor-pointer text-white border-gray-600 hover:bg-[#c1f94c] hover:text-black"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
