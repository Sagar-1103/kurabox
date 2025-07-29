import { getPassword } from "./storage";

export const passwordHashHex = async (password: string) => {
  if (typeof window === "undefined" || !window.crypto?.subtle ) return;
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex
};

export const checkIsPasswordValid = async (password:string) =>{
    const hashHex = await getPassword();
    const userHashHex = await passwordHashHex(password);
    return hashHex===userHashHex;
}

export const isPasswordStored = async()=>{
    const password = await getPassword();
    return password?true:false;
}

const enc = (t:string) => new TextEncoder().encode(t);
const dec = (b:ArrayBuffer) => new TextDecoder().decode(b);

// Encrypt
export const encrypt = async (text:string, password:string) => {
  if (typeof window === "undefined" || !window.crypto?.subtle ) return;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 1e5, hash: "SHA-256" },
    await crypto.subtle.importKey("raw", enc(password), "PBKDF2", false, ["deriveKey"]),
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc(text)));
  const out = new Uint8Array([...salt, ...iv, ...ct]);
  return btoa(String.fromCharCode(...out));
}

// Decrypt
export const decrypt = async(encrypted:string, password:string) => {
  if (typeof window === "undefined" || !window.crypto?.subtle ) return;
  const data = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  const salt = data.slice(0, 16), iv = data.slice(16, 28), ct = data.slice(28);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 1e5, hash: "SHA-256" },
    await crypto.subtle.importKey("raw", enc(password), "PBKDF2", false, ["deriveKey"]),
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return dec(pt);
}
