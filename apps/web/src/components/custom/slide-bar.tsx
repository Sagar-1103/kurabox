import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  ArrowRight,
  Check,
  Copy,
  LucideLogOut,
  Plus,
  Settings,
} from "lucide-react";
import { deletePassword, deleteSeedPhrase } from "utils/storage";
import { useRouter } from "next/navigation";
import { AccountTypes, WalletUtils } from "utils/walletUtils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import SettingsDialog from "./Settings";
import { handleCopy } from "utils/copy";

interface SlidebarProps {
  accounts: AccountTypes[];
  setAccounts: (account: AccountTypes[]) => void;
  selectedAccountId: number;
  setSelectedAccountId: (accountId: number) => void;
  mode: "mainnet" | "testnet";
  setMode: (newMode: "mainnet" | "testnet") => void;
}

export default function Slidebar({
  accounts,
  setAccounts,
  selectedAccountId,
  setSelectedAccountId,
  mode,
  setMode,
}: SlidebarProps) {
  const [render, setRender] = useState(false);
  const [copiedChain, setCopiedChain] = useState<
    null | "solana" | "polygon" | "ethereum"
  >(null);
  const [copied, setCopied] = useState(false);
  const addAccounts = async () => {
    await WalletUtils.addAccount(accounts.length);
    setRender((prev) => !prev);
    toast.success("Wallet Added", {
      description: "New account created.",
    });
  };

  const router = useRouter();

  const getAccounts = async () => {
    await WalletUtils.init();
    const accounts = await WalletUtils.getAccounts();

    if (accounts) {
      setAccounts(accounts);
    }
  };

  useEffect(() => {
    getAccounts();
  }, [render]);

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Avatar className="rounded-lg text-black hover:scale-105 cursor-pointer font-semibold my-auto bg-[#c1f94c]">
            <AvatarFallback>A{selectedAccountId}</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent className="border-gray-700/80 bg-[#0a0e14] w-fit border-1 mr-5 my-5 rounded-lg h-[95%]">
          <SheetClose asChild>
            <button className="w-10 mt-3 mx-2.5 cursor-pointer justify-items-center py-2 text-gray-500 hover:bg-white p-2 rounded-lg hover:text-black">
              <ArrowRight className="h-5 w-5" />
            </button>
          </SheetClose>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="h-[55%] md:h-[62%]  flex flex-col gap-y-4 overflow-y-auto scrollbar-hide ">
            {accounts.map((account) => (
              <div
                key={account.id + 1}
                className=" p-2 rounded-lg shadow-md mx-1"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar
                      onClick={async () => {
                        setSelectedAccountId(account.id + 1);
                        localStorage.setItem(
                          "accountIndex",
                          `${account.id + 1}`
                        );
                      }}
                      className={`rounded-lg hover:bg-[#c1f94c] hover:text-black ${selectedAccountId === account.id + 1 ? "bg-[#c1f94c] text-black" : "bg-gray-700 text-white"} w-10 h-10 my-1 m-auto cursor-pointer font-semibold `}
                    >
                      <AvatarFallback>A{account.id + 1}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <div className="w-56 rounded-xl bg-[#1c1c1e] p-4 shadow-lg text-sm text-white space-y-3">
                      {account.tokens.map((token) => (
                        <div
                          key={token.chain}
                          className="flex flex-row justify-between gap-1 border-b border-white/10 pb-2 last:border-none last:pb-0"
                        >
                          {mode === "mainnet" && <p className="text-gray-400">
                            {token.chain.charAt(0).toUpperCase() + token.chain.slice(1)}
                          </p>}
                          { mode!=="mainnet" && <p className="text-gray-400">
                            {token.chain==="solana"?"Devnet":token.chain==="ethereum"?"Sepolia":"Amoy"}
                          </p>}
                          <div className="flex">
                            <p className="text-white truncate">
                              {token.publicKey.slice(0, 6)}...
                              {token.publicKey.slice(-4)}
                            </p>
                            {copied && copiedChain == token.chain ? (
                              <Check
                                className="text-green-400 mx-2"
                                size={15}
                              />
                            ) : (
                              <Copy
                                onClick={() => {
                                  setCopiedChain(token.chain);
                                  handleCopy(token.publicKey, setCopied, {
                                    title: "Address Copied",
                                    description:
                                      token.chain.charAt(0).toUpperCase() +
                                      token.chain.slice(1) +
                                      " public address copied to clipboard.",
                                  });
                                }}
                                size={15}
                                className="mx-2"
                              />
                            )}
                            {/* {copiedChain !== token.chain ? (
                              <Copy
                                onClick={() => {
                                  setCopiedChain(token.chain);
                                  handleCopy(token.publicKey, setCopied, {
                                    title: "Address Copied",
                                    description:
                                      token.chain.charAt(0).toUpperCase() +
                                      token.chain.slice(1) +
                                      " public address copied to clipboard.",
                                  });
                                }}
                                size={15}
                                className="mx-2"
                              />
                            ) : (
                              <Check
                                className="text-green-400 mx-2"
                                size={15}
                              />
                            )} */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 w-full flex flex-col items-center space-y-3">
            <div className="h-[1px] w-[75%] bg-gray-600" />

            <button
              onClick={addAccounts}
              className="text-white p-2 hover:bg-white cursor-pointer rounded-md hover:text-black transition-all duration-200"
            >
              <Plus className="w-6 h-6" />
            </button>

            <SettingsDialog mode={mode} setMode={setMode}>
              <button className="text-white p-2 hover:bg-white cursor-pointer rounded-md hover:text-black transition-all duration-200">
                <Settings className="w-6 h-6" />
              </button>
            </SettingsDialog>

            <button
              onClick={async () => {
                await deleteSeedPhrase();
                await deletePassword();
                localStorage.clear();
                router.replace("/");
              }}
              className="text-white p-2 hover:bg-red-600 cursor-pointer rounded-md hover:text-white transition-all duration-200"
            >
              <LucideLogOut className="w-6 h-6" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
