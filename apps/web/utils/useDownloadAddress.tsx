"use client";
import React, { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Chain } from "utils/walletUtils";
import { imagePaths } from "utils/image-paths";
import { toast } from "sonner";
import { useQRCode } from "next-qrcode";

export default function useDownloadAddress(
  chain: Chain,
  publicAddress: string
) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { SVG } = useQRCode();

  useEffect(() => {
    document.fonts.ready;
  }, []);

  const DownloadCard = () => (
    <div ref={imageRef} className="p-8 bg-transparent">
      <div className="bg-black text-white mx-auto p-6 w-[387px] z-50 rounded-3xl shadow-2xl border border-gray-700">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold tracking-wide mb-1 text-lime-400">
            KuraBox
          </h2>
          <p className="text-sm text-gray-400">
            Public {chain.slice(0, 1).toUpperCase() + chain.slice(1)} Address
          </p>
        </div>

        <div className="bg-white relative p-3 flex justify-center rounded-xl mb-4">
          <SVG
            text={publicAddress}
            options={{
              margin: 2,
              width: 320,
              color: {
                dark: "#000000ff",
                light: "#ffffffff",
              },
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md">
            <img
              src={imagePaths[`${chain}`]}
              alt={`${chain}-logo`}
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="bg-gray-800 px-4 py-3 rounded-xl text-xs text-center break-words font-mono tracking-wide">
          {publicAddress}
        </div>
      </div>{" "}
    </div>
  );

  const download = async () => {
    if (!imageRef.current) return;

    await document.fonts.ready;
    const dataUrl = await toPng(imageRef.current);
    const link = document.createElement("a");
    link.download = `${chain}-address.png`;
    link.href = dataUrl;
    link.click();
    toast.success(
      `${chain.slice(0, 1).toUpperCase() + chain.slice(1)} public address downloaded`,
      {
        description: `Share it to receive ${chain}`,
      }
    );
  };

  return { DownloadCard, download };
}
