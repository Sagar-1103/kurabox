import Image from "next/image";
import React, { useRef, useState } from "react";
import { imagePaths } from "utils/image-paths";
import { Chain, tok } from "utils/walletUtils";
import { Button } from "../ui/button";
import { sendSolana } from "utils/send-sol";
import { sendEth } from "utils/send-ether";
import { sendPol } from "utils/send-polygon";
import { toast } from "sonner";
import QrScanner from "qr-scanner";
import { Input } from "../ui/input";
import { checkIsPasswordValid } from "utils/security-functions";
import { getSeedPhrase } from "utils/storage";
import Scanner from "./Scanner";

interface SendTempProps {
  chain: Chain;
  balance: number;
  setOpen: (val: boolean) => void;
}

export default function SendTemp({ chain, balance, setOpen }: SendTempProps) {
  const [publicAddress, setPublicAddress] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sendPermission, setSendPermission] = useState(false);
  const [showScanner,setShowScanner] = useState(false);
  const [pin, setPin] = useState("");

  const handleCheckPin = async () => {
    const isPinCorrect = await checkIsPasswordValid(pin);
    if (isPinCorrect) {
      const recoveryPhrase = await getSeedPhrase();
      if (recoveryPhrase) {
        setSendPermission(true);
        setPin("");
      }
    } else {
      toast.error("Incorrect pin.");
    }
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      if (result?.data) {
        setPublicAddress(result.data.trim());
        toast.success("Address scanned from QR code.");
      } else {
        toast.error("No valid QR code found.");
      }
    } catch (err) {
      toast.error("Failed to decode QR code.");
    }
  };

  const sendToken = async () => {
    try {
      setIsLoading(true);
      let transactionSignature;
      if (!publicAddress || !quantity) {
        toast.error("Provide all the fields.");
        setIsLoading(false);
        return;
      }
      if (quantity > balance) {
        toast.error("You don't have sufficient funds.");
        setIsLoading(false);
        return;
      }

      const promise = () =>
        new Promise(async (resolve, reject) => {
          try {
            if (chain === "solana") {
              transactionSignature = await sendSolana(
                publicAddress,
                quantity,
                setOpen
              );
            } else if (chain === "ethereum") {
              transactionSignature = await sendEth(
                publicAddress,
                quantity,
                setOpen
              );
            } else if (chain === "polygon") {
              transactionSignature = await sendPol(
                publicAddress,
                quantity,
                setOpen
              );
            }
            setIsLoading(false);
            resolve({});
          } catch (error) {
            console.log("Some error occurred.");
            setIsLoading(false);
            reject();
          }
        });

      toast.promise(promise, {
        loading: "Transaction is being processed...",
        success: `Sent ${quantity} ${tok[`${chain}`]} to ${publicAddress.slice(0, 6)}...${publicAddress.slice(-4)}`,
        error: "Something went wrong. Please try again.",
      });
    } catch (error) {
      console.log(`Error sending ${chain}`);
    }
  };

  if (!sendPermission) {
    return (
      <div className="mt-4 space-y-4">
        <Input
          type="password"
          placeholder="Enter your PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="bg-[#14191f] border border-gray-700 text-white"
        />
        <Button
          onClick={handleCheckPin}
          disabled={pin.length < 6}
          className="bg-[#c1f94c] text-black font-semibold text-sm py-2 px-4 rounded-md w-full"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-5">
      <div className="flex justify-center">
        <Image
          src={imagePaths[`${chain}`]}
          width={80}
          height={80}
          alt={chain}
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">
          Scan QR code or enter manually
        </label>

        <div className="flex space-x-1">
          <Input
            id="qr-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleQrUpload}
            className="text-sm cursor-pointer"
          />
          <Button onClick={()=>setShowScanner(true)} className="bg-[#c1f94c] cursor-pointer text-black">Scan</Button>
        </div>
        {
          showScanner && <Scanner setPublicAddress={setPublicAddress} setShowScanner={setShowScanner} />
        }
        <input
          type="text"
          placeholder={`Recipient's ${chain} address`}
          value={publicAddress}
          onChange={(e) => setPublicAddress(e.target.value.trim())}
          className="bg-[#14191f] text-sm text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Enter amount</label>
        <div className="flex items-center border border-gray-700 bg-[#14191f] rounded-md overflow-hidden">
          <input
            type="number"
            min={0}
            max={balance}
            step={0.01}
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 text-sm"
            placeholder="0"
            value={quantity}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (e.target.value === "") {
                setQuantity(0);
              } else if (!isNaN(val)) {
                const clamped = Math.max(0, Math.min(balance, val));
                setQuantity(clamped);
              }
            }}
          />
          <span className="px-3 text-sm text-white">{tok[`${chain}`]}</span>
          <button
            className="px-3 py-2 text-xs font-medium cursor-pointer bg-[#c1f94c] text-black rounded-l-none rounded-md"
            onClick={() => setQuantity(balance)}
          >
            Max
          </button>
        </div>
        <div className="text-xs text-gray-400 flex justify-end mt-1">
          Available {balance ?? 0} {tok[`${chain}`]}
        </div>
      </div>

      <Button
        onClick={sendToken}
        disabled={
          !quantity || !publicAddress || quantity > balance || isLoading
        }
        className="mt-2 w-full bg-[#c1f94c] text-black text-sm font-semibold py-2 px-4 rounded-md"
      >
        Send
      </Button>
    </div>
  );
}
