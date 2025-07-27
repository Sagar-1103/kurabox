import {
  CopyIcon,
  Link,
  SendIcon,
} from "lucide-react";
import React from "react";
import ReceiveToken from "./receive-token";

export default function ChainCard() {
  return (
    <div className="bg-[#0b0c10] rounded-2xl p-6 shadow-xl hover:scale-101 transition border border-[#1a1a1a] w-[340px] text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-2 rounded-full">
            <Link className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Solana</h2>
            <p className="text-sm text-gray-400">7xXtg...gAsU</p>
          </div>
        </div>
        <span className="text-sm bg-[#1f1f1f] px-3 py-1 rounded-full">SOL</span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Balance</span>
          <span className="text-white font-medium">12.45 SOL</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-400">USD Value</span>
          <span className="text-green-400 font-semibold">$2,456.78</span>
        </div>
      </div>

      <div className="border-t border-[#1f1f1f] my-4" />

      <div className="flex justify-between mb-3">
        <button className="flex items-center gap-2 text-sm hover:bg-[#1e1e1e] px-3 py-2 rounded-lg transition">
          <CopyIcon className="w-4 h-4" /> Copy
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 hover:bg-[#c1f94c] hover:text-black py-2 rounded-lg border border-gray-700 transition">
          <SendIcon className="w-4 h-4" /> Send
        </button>
        {/* <button className="flex items-center justify-center gap-2 hover:bg-[#c1f94c] hover:text-black py-2 rounded-lg border border-gray-700 transition">
          <DownloadIcon className="w-4 h-4" /> Receive
        </button> */}
          <ReceiveToken/>
      </div>
    </div>
  );
}
