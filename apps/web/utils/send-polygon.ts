import { ethers, HDNodeWallet } from "ethers";
import { getSeedPhrase } from "./storage";
import { mnemonicToSeed } from "bip39";

export const sendPol = async(publicAddress:string,quantity:number,setOpen:(val:boolean)=>void) => {
    const mnemonic = await getSeedPhrase();
    if (!mnemonic) return;

    const mode = localStorage.getItem('mode');
    if(!mode) return;

    const rpcURL = mode==="mainnet"? "https://polygon-rpc.com": "https://rpc-amoy.polygon.technology";
    const provider = new ethers.JsonRpcProvider(rpcURL);

    const seed = await mnemonicToSeed(mnemonic.trim());
    const selectedAccountIndex = localStorage.getItem('accountIndex');
    if (!selectedAccountIndex) return;
    const index = JSON.parse(selectedAccountIndex)-1;
    const path = `m/44'/60'/0'/0/${index}`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = await wallet.sendTransaction({
        to: publicAddress.trim(),
        value: ethers.parseEther(`${quantity}`),
    });

    const receipt = await tx.wait();
    setOpen(false);
    return receipt;
}