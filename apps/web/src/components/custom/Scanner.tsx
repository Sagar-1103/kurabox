"use client";
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ScannerProps {
  setShowScanner: (val: boolean) => void;
  setPublicAddress: (val: string) => void;
}

export default function Scanner({
  setShowScanner,
  setPublicAddress,
}: ScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        showTorchButtonIfSupported: true,
      },
      false
    );

    scanner.render(
      (decodedText: string) => {
        setPublicAddress(decodedText.trim());
        scanner.clear().then(() => setShowScanner(false));
        toast.success("Address scanned from QR code.");
      },
      (error: any) => {
        
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [setPublicAddress, setShowScanner]);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-[#0f1114] rounded-xl border border-gray-700 w-[100%] max-w-md p-5 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Scan QR Code</h2>
          <button
            onClick={() => setShowScanner(false)}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            <X/>
          </button>
        </div>

        <div className="rounded-md overflow-hidden border border-gray-700">
          <div id="qr-reader" className="w-full" />
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          Align QR code inside the box
        </p>
      </div>
    </div>
  );
}
