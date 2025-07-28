import { mnemonicToSeed } from "bip39";
import { getAccountsFromDB, getSeedPhrase, saveAccounts } from "./storage";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import {ethers, HDNodeWallet} from "ethers";

export type Chain = "solana" | "polygon" | "ethereum";

export interface Token {
  publicKey:string;
  chain:Chain;
};

export interface AccountTypes {
  id:number;
  tokens:Token[];
};

export class WalletUtils {
  private static accounts: AccountTypes[] = [];
  private static seedPhrase?: string | null = null;

  static async init() {
    const phrase = await getSeedPhrase();
    this.seedPhrase = phrase?.trim().toLowerCase().replace(/\s+/g, " ") || null;
  }

  static async createAccount(accountIndex: number) {
    if (!this.seedPhrase) return;
    const seed = await mnemonicToSeed(this.seedPhrase);
    const solKeypair = this.createSolWallet(accountIndex,seed);
    const ethKeypair = this.createEthWallet(accountIndex,seed);
    accountIndex++;
    return {solKeypair,ethKeypair};
  }

  static createSolWallet(accountIndex:number,seed:Buffer<ArrayBufferLike>){
    const path = `m/44'/501'/${accountIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const solKeypair = Keypair.fromSecretKey(secret);
    return {publicKey:solKeypair.publicKey.toBase58()};
  }

  static createEthWallet(accountIndex:number,seed:Buffer<ArrayBufferLike>){
    // const path = `m/44'/60'/${accountIndex}'/0'`;
    const path = `m/44'/60'/0'/0/${accountIndex}`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new ethers.Wallet(privateKey);
    return {publicKey:wallet.address};
  }

  static async getAccounts() {
    if (!this.seedPhrase) return;
    if (this.accounts.length === 0) {
      const stringifiedAccounts = await getAccountsFromDB();
      if (stringifiedAccounts) {
        this.accounts = JSON.parse(stringifiedAccounts);
      } else {
        await this.addAccount(0);
      }
      return this.accounts;
    }
  }

  static async addAccount(index: number) {
    if (!this.seedPhrase) return;

    const keyPairs = await this.createAccount(index);
    if(!keyPairs) return;
    const solWallet:Token = {publicKey:keyPairs?.solKeypair.publicKey,chain:"solana"};
    const ethWallet:Token = {publicKey:keyPairs?.ethKeypair.publicKey,chain:"ethereum"}; 
    const polWallet:Token = {publicKey:keyPairs?.ethKeypair.publicKey,chain:"polygon"}; 

    this.accounts.push({ id: index,tokens:[solWallet,ethWallet,polWallet]});
    
    await saveAccounts(JSON.stringify([...this.accounts]));
    return { id: index,tokens:[solWallet,ethWallet,polWallet]};
  }
}
