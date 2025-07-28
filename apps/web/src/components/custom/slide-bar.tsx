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
import { ArrowRight, LucideLogOut, Plus, Settings } from "lucide-react";
import { deleteAccounts, deletePassword, deleteSeedPhrase } from "utils/storage";
import { useRouter } from "next/navigation";
import { AccountTypes, WalletUtils } from "utils/walletUtils";

interface SlidebarProps {
  accounts: AccountTypes[];
  setAccounts: (account: AccountTypes[]) => void;
  selectedAccountId: number;
  setSelectedAccountId: (accountId: number) => void;
}

export default function Slidebar({
  accounts,
  setAccounts,
  selectedAccountId,
  setSelectedAccountId,
}: SlidebarProps) {
  const [render,setRender] = useState(false);
  const addAccounts = async() => {
    await WalletUtils.addAccount(accounts.length);
    setRender((prev)=>!prev);
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
              <div key={account.id+1} className=" p-2 rounded-lg shadow-md mx-1">
                <Avatar
                  onClick={() => setSelectedAccountId(account.id+1)}
                  className={`rounded-lg hover:bg-[#c1f94c] hover:text-black ${selectedAccountId === account.id+1 ? "bg-[#c1f94c] text-black" : "bg-gray-700 text-white"} w-10 h-10 my-1 m-auto cursor-pointer font-semibold `}
                >
                  <AvatarFallback>A{account.id+1}</AvatarFallback>
                </Avatar>
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

            <button className="text-white p-2 hover:bg-white cursor-pointer rounded-md hover:text-black transition-all duration-200">
              <Settings className="w-6 h-6" />
            </button>

            <button
              onClick={async() => {
                await deleteSeedPhrase();
                await deletePassword();
                await deleteAccounts();
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
