import { Network, Alchemy } from "alchemy-sdk";
import { getSeedPhrase } from "./storage";
import { mnemonicToSeed } from "bip39";
import { ethers, HDNodeWallet } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

const settings1 = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy1 = new Alchemy(settings1);

export const sendEth = async (recipientAddress: string, quantity: number,setOpen:(val:boolean)=>void) => {
  const mnemonic = await getSeedPhrase();
  if (!mnemonic) return;

  const mode = localStorage.getItem('mode');
  if(!mode) return;

  const seed = await mnemonicToSeed(mnemonic.trim());
  const selectedAccountIndex = localStorage.getItem('accountIndex');
  if (!selectedAccountIndex) return;
  const index = JSON.parse(selectedAccountIndex)-1;

  const path = `m/44'/60'/0'/0/${index}`;
  
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new ethers.Wallet(privateKey);

  let nonce;
  if (mode==="mainnet") {    
    nonce = await alchemy1.core.getTransactionCount(
      wallet.address,
      "latest"
    )
  } else {
      nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        "latest"
      );
  }

  let transaction = {
    to: recipientAddress,
    value: ethers.parseEther(`${quantity}`),
    gasLimit: 21000,
    maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
    maxFeePerGas: ethers.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: mode === "mainnet" ? 1 : 11155111,
  };
  let rawTransaction = await wallet.signTransaction(transaction);
  let tx;
  if(mode==="mainnet"){
    tx = await alchemy1.core.sendTransaction(rawTransaction);
  } else {
    tx = await alchemy.core.sendTransaction(rawTransaction);
  }
  setOpen(false);
  return tx;
};
