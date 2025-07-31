"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, Copy, DownloadIcon, QrCode, Share2 } from "lucide-react";
import { Input } from "../ui/input";
import { useQRCode } from "next-qrcode";
import { Chain, tok } from "utils/walletUtils";
import useDownloadAddress from "utils/useDownloadAddress";
import Image from "next/image";
import { imagePaths } from "utils/image-paths";
import { handleCopy } from "utils/copy";
interface ReceiveTokenProps {
  publicAddress: string;
  chain: Chain;
  children: React.ReactNode;
}

export default function ReceiveToken({
  publicAddress,
  children,
  chain,
}: ReceiveTokenProps) {
  const { SVG } = useQRCode();
  const { DownloadCard, download, handleShare } = useDownloadAddress(chain, publicAddress);
  const [copied, setCopied] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] px-6 py-5 rounded-xl bg-[#0a0e14] text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2 font-semibold">
            <QrCode className="w-5 h-5 text-purple-400" />
            Receive {chain.slice(0, 1).toUpperCase() + chain.slice(1)}
          </DialogTitle>
          {/* <p className="text-sm text-muted-foreground text-gray-400 mt-1">
            Share this address to receive {chain}
          </p> */}
        </DialogHeader>

        <div className="w-[220px] h-[220px] mx-auto border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center ">
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
            <div className="relative">
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md">
                <Image
                  src={imagePaths[`${chain}`]}
                  alt={`${chain}-logo`}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className=" w-full">
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

        <div className="mt-1 bg-[#232217] text-yellow-300 text-xs sm:text-sm border-yellow-600/70 border-1 p-3 rounded-lg leading-relaxed">
          <span className="font-semibold">Important:</span> Only send{" "}
          {tok[`${chain}`]} to this address on the {chain}{" "}
          network. Sending tokens from other networks may result in permanent
          loss.
        </div>

        <div className="mt-1 flex flex-col sm:flex-row justify-center gap-3">
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-full sm:w-[48%] cursor-pointer text-white border-gray-600 hover:bg-[#c1f94c] hover:text-black"
            onClick={() =>
              handleCopy(publicAddress, setCopied, {
                title: "Address Copied",
                description: "Wallet public address copied to clipboard.",
              })
            }
          >
            {copied ? (
              <>
                <Check size={16} className="mr-2" />
                Copied Address
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" />
                Copy Address
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={download}
            size={"lg"}
            className="w-full sm:w-[48%] cursor-pointer text-white border-gray-600 hover:bg-[#c1f94c] hover:text-black"
          >
            <DownloadIcon size={16} className="mr-2" />
            Download
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={handleShare}
            size={"lg"}
            className="w-full cursor-pointer text-white border-gray-600 hover:bg-[#c1f94c] hover:text-black"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>
        <div className="absolute -top-1000">
          <DownloadCard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
