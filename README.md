# 🚀 Kurabox

Kurabox is a **secure, web-based HD crypto wallet**  
with **multi-chain support** for **Solana**, **Ethereum** and **Polygon**.

🌐 **Live Site:** [https://kurabox-web.vercel.app/](https://kurabox-web.vercel.app/)

<img width="1322" height="863" alt="kurabox-2" src="https://github.com/user-attachments/assets/d25f3a67-1907-4bd7-b454-506ff655953e" />

<img width="1319" height="864" alt="kurabox-3" src="https://github.com/user-attachments/assets/00822be0-097d-4da5-ac2f-2028d3a6da24" />

<img width="1147" height="826" alt="kurabox-5" src="https://github.com/user-attachments/assets/ba51b616-40b2-433f-9819-550b59fc9038" />

## ⭐ Features

- 🔐 **Secure HD Wallet Architecture**  
  Your keys are generated and stored securely on-device using BIP-39 and ed25519 standards. They never leave your device.

- 🌐 **Multi-Chain Support**  
  Effortlessly manage assets across Solana, Ethereum and Polygon, all in one wallet.

- 📱 **QR Code-Based Address Sharing**  
  Send or receive crypto easily using scannable QR codes, no manual copying or pasting required.

- ♻️ **Mnemonic Backup & Recovery**  
  Regain access to your wallet using your 12/24 word seed phrase, simple and secure recovery.

- ⚡ **Alchemy Powered Data**  
  Integrated with Alchemy SDK for fast and reliable blockchain data access.

- 💎 **Clean & Responsive UI**  
  Built using TailwindCSS and Radix UI for a fast, accessible and modern user experience.

<img width="1290" height="810" alt="kurabox-4" src="https://github.com/user-attachments/assets/d7caf960-d3c9-460b-a57e-b90e9bdabf4a" />

https://github.com/user-attachments/assets/3dfe3e9a-b719-4d5a-b916-712ac7646314

## 🛠 Tech Stack
-  Next.js
-  TypeScript
-  Tailwind CSS
-  Shadcn
-  Axios
-  Alchemy SDK
-  Redis
-  Upstash
-  Turborepo
-  @solana/web3.js
-  ethers.js

## 🚀 Getting Started

Follow these steps to run Kurabox locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Sagar-1103/kurabox.git
cd kurabox
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables
Create a .env file in the apps/web directory with the following:
```bash
NEXT_PUBLIC_API_KEY=your_alchemy_api_key_here
NEXT_PUBLIC_REDIS_URL=your_redis_url_here
NEXT_PUBLIC_REDIS_TOKEN=your_redis_token_here
```

### 4. Run the Development Server
```bash
pnpm run dev
```
