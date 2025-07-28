"use client";
import ChainCard from "@/components/custom/chain-card";
import Receive from "@/components/custom/receive";
import Slidebar from "@/components/custom/slide-bar";
import { Button } from "@/components/ui/button";
import { Activity, QrCode, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AccountTypes, Chain } from "utils/walletUtils";
import useGetBalances from "hooks/get-balances";
import { getSelectedAccountIndex } from "utils/storage";


export default function Wallet() {
  const [action, setAction] = useState<"wallets" | "activity">("wallets");
  const [accounts, setAccounts] = useState<AccountTypes[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1);
  const [balances,setBalances] = useState<{chain:Chain,balance:number}[]>([{chain:"solana",balance:0},{chain:"polygon",balance:0},{chain:"ethereum",balance:0}]);
  const [mode,setMode] = useState<"mainnet"|"testnet">("mainnet");
  useGetBalances(accounts,selectedAccountId,mode,setBalances,setMode);

  const getDBIndex = async () => {
    const selectedIndex = await getSelectedAccountIndex();
    if (!selectedIndex) return;
    setSelectedAccountId(selectedIndex);
  };

  useEffect(()=>{
    getDBIndex();
  },[])

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl bg-gradient-to-r from-[#c1f94c] to-[#fcd44c] bg-clip-text text-transparent font-bold">
          KuraBox
        </p>
        <Slidebar
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccountId={selectedAccountId}
          setMode={setMode}
          mode={mode}
          setSelectedAccountId={setSelectedAccountId}
        />
      </div>

      <div className="pt-20 flex flex-row gap-x-8 justify-center align-bottom">
        <Receive networks={accounts[selectedAccountId-1]?.tokens ?? []}>
          <div className="flex flex-col w-32 h-32 items-center cursor-pointer gap-y-2 hover:bg-[#c1f94c] hover:text-black font-semibold border-gray-800 border-1 hover:border-0 justify-center rounded-md">
            <QrCode size={40} />
            <p>Receive</p>
          </div>
        </Receive>
        <div className="flex flex-col w-32 h-32 items-center cursor-pointer gap-y-2 hover:bg-[#c1f94c] hover:text-black font-semibold border-gray-800 border-1 hover:border-0 justify-center rounded-md">
          <Send size={40} />
          <p>Send</p>
        </div>
      </div>

      <div className="bg-[#151c29] flex flex-row rounded-xl p-1.5 mt-10 mb-6">
        <div className="w-1/2">
          <Button
            onClick={() => setAction("wallets")}
            className={`w-full ${action === "wallets" && "bg-[#c1f94c] text-black"} `}
          >
            Wallets
          </Button>
        </div>
        <div className="w-1/2">
          <Button
            onClick={() => setAction("activity")}
            className={`w-full ${action === "activity" && "bg-[#c1f94c] text-black"} `}
          >
            Activity
          </Button>
        </div>
      </div>

      {action === "wallets" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-5 w-full">
          {accounts.length !== 0 &&
            accounts[selectedAccountId - 1]?.tokens?.map((token,index) => (
              <ChainCard key={token.chain} token={token} balance={balances[index]?.balance||0} />
            ))}
        </div>
      ) : (
        <div className="w-full bg-[#0e121b] p-4 rounded-lg border border-[#1c1f26]">
          <div className="w-full mb-6">
            <p className="text-2xl text-white font-semibold ">
              Recent Activity
            </p>
            <p className="text-sm text-gray-300">
              Your latest transactions across all chains
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center py-16 text-center">
            <Activity size={40} className="text-gray-400" />
            <p className="text-lg mt-4 mb-1 text-gray-300">
              No recent activity
            </p>
            <p className="text-sm text-gray-300">
              Your transactions will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
