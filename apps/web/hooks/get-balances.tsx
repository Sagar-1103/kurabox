import axios from "axios";
import React, { useEffect } from "react";
import { getMode, saveMode } from "utils/storage";
import { AccountTypes } from "utils/walletUtils";
import { Chain } from "utils/walletUtils";

export default function useGetBalances(
  accounts: AccountTypes[],
  selectedAccountId: number,
  mode: "mainnet" | "testnet",
  setBalances: React.Dispatch<
    React.SetStateAction<{ chain: Chain; balance: number }[]>
  >,
  setMode: React.Dispatch<React.SetStateAction<"mainnet" | "testnet">>,
) {
  useEffect(() => {
    getBalances();
    getDBMode();
  }, [accounts.length, selectedAccountId, mode]);

  const getDBMode = async () => {
    const selectedMode = await getMode();
    if(!selectedMode) {
      await saveMode("mainnet");
      setMode("mainnet")
    }
    setMode(selectedMode);
  };

  const getBalances = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet/balances`;

      const tokens = accounts[selectedAccountId - 1]?.tokens;
      if (!tokens) return;
      const response = await axios.post(
        url,
        {
          mode,
          tokens,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.data;
      setBalances(res.results);
    } catch (error) {
      console.log("Error fetching balances: ", error);
    }
  };

  return;
}
