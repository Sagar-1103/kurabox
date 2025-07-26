import { Key } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function ExistingWallet() {
  const [wordCount, setWordCount] = useState<12 | 24>(12);
  const [seedWords, setSeedWords] = useState<string[]>(Array(24).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...seedWords];
    newWords[index] = value.trim();
    setSeedWords(newWords);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("Text");
    const words = pastedText.trim().split(/\s+/).slice(0, wordCount);
    const newWords = [...seedWords];
    words.forEach((word, i) => {
      newWords[i] = word;
    });
    setSeedWords(newWords);
  };

  const handleSubmit = ()=>{
    console.log(seedWords.join(" "));
  }

  return (
    <div className="w-full mx-auto -mt-2 space-y-6">
      <div>
        <div className="flex items-center gap-x-2">
          <Key className="text-[#b8ff4c]" />
          <h2 className="text-2xl font-semibold text-white">
            Secret Recovery Phrase
          </h2>
        </div>
        <p className="text-sm md:text-md text-gray-300 mt-1">
          Enter your existing 12 or 24 word seed phrase to restore your wallet.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-300 gap-2">
        <span className="font-medium">Seed Length:</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={`px-4 py-1 text-sm ${
              wordCount === 12
                ? "bg-[#b8ff4c] text-black"
                : "bg-[#151c29] text-white"
            }`}
            onClick={() => setWordCount(12)}
          >
            12 Words
          </Button>
          <Button
            variant="outline"
            className={`px-4 py-1 text-sm ${
              wordCount === 24
                ? "bg-[#b8ff4c] text-black"
                : "bg-[#151c29] text-white"
            }`}
            onClick={() => setWordCount(24)}
          >
            24 Words
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: wordCount }, (_, index) => (
          <div key={index} className="flex flex-row">
            <input
              type="text"
              placeholder={`Word ${index + 1}`}
              value={seedWords[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onPaste={handlePaste}
              className="w-full p-2 rounded-md bg-[#151c29] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8ff4c]"
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400">
        Paste the entire phrase into any box to auto fill all fields.
      </p>

      <Button
        disabled={seedWords.slice(0, wordCount).some((w) => !w)}
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] text-black py-3 text-md font-medium"
      >
        Import Wallet
      </Button>
    </div>
  );
}
