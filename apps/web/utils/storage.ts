import { openDB } from "idb";
import { decrypt, encrypt, isPasswordStored, passwordHashHex } from "./security-functions";

const DB_NAME = "wallet-store";
const STORE_NAME = "wallet";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};


export async function deletePassword() {
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.delete(STORE_NAME, 'password');
}

export async function deleteSeedPhrase() {
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.delete(STORE_NAME, 'seed');
}

export const savePassword = async (password: string) => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const isPasswordThere = await isPasswordStored();
  if (isPasswordThere) {
    deletePassword();
  }
  const hashHex = await passwordHashHex(password);
  await db.put(STORE_NAME, hashHex, "password");
};

export const getPassword = async () => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const hashHex = await db.get(STORE_NAME,"password");
  return hashHex;
};

export const saveSeedPhrase = async (seedPhrase:string) => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const hashHex = await getPassword();
  const encryptedSeedPhrase = await encrypt(seedPhrase,hashHex);
  await db.put(STORE_NAME,encryptedSeedPhrase,"seed");
}

export const getSeedPhrase = async()=>{
  if (typeof window === "undefined") return;
  const db = await initDB();
  const hashHex = await getPassword();
  const encryptedSeedPhrase = await db.get(STORE_NAME,"seed");
  if (!encryptedSeedPhrase) return null;
  const seedPhrase = await decrypt(encryptedSeedPhrase,hashHex);
  return seedPhrase;
} 

export async function deleteAccounts() {
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.delete(STORE_NAME, 'accounts');
}

export const getAccountsFromDB = async () => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const accounts = await db.get(STORE_NAME,"accounts");
  return accounts;
};

export const saveAccounts = async (accounts: string) => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const isAccountsThere = await getAccountsFromDB();
  if (isAccountsThere) {
    await deleteAccounts();
  }
  await db.put(STORE_NAME, accounts, "accounts");
};

export async function deleteMode() {
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.delete(STORE_NAME, 'mode');
}

export const saveMode = async (mode: "mainnet"|"testnet") => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const isModeThere = await getMode();
  if (isModeThere) {
    deleteMode();
  }
  await db.put(STORE_NAME, mode, "mode");
};

export const getMode = async () => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const mode = await db.get(STORE_NAME,"mode");
  return mode;
};


export async function deleteSelectedAccountIndex() {
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.delete(STORE_NAME, 'selectedAccountIndex');
}

export const saveSelectedAccountIndex = async (index: number) => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const isIndexThere = await getSelectedAccountIndex();
  if (isIndexThere) {
    deleteSelectedAccountIndex();
  }
  await db.put(STORE_NAME, index, "selectedAccountIndex");
};

export const getSelectedAccountIndex = async () => {
  if (typeof window === "undefined") return;
  const db = await initDB();
  const index = await db.get(STORE_NAME,"selectedAccountIndex");
  return index;
};
