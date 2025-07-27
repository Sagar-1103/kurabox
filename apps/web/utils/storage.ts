import { openDB } from "idb";

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

export const savePassword = async(password:string)=>{
  if (typeof window === 'undefined') return;
  const db = await initDB();
  await db.put(STORE_NAME, password, 'password');
}