import { mnemonicToSeed } from "bip39";
import { getSeedPhrase } from "./storage";
import { derivePath } from "ed25519-hd-key";
import {
  address,
  appendTransactionMessageInstructions,
  createKeyPairSignerFromPrivateKeyBytes,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  getSignatureFromTransaction,
  lamports,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";

export const sendSolana = async (recipientBase58Address:string,quantity:number) => {
  const mnemonic = await getSeedPhrase();
  if (!mnemonic) return;
  
  const seed = await mnemonicToSeed(mnemonic.trim());
  const selectedAccountIndex = localStorage.getItem('accountIndex');
  if (!selectedAccountIndex) return;
  const index = JSON.parse(selectedAccountIndex)-1;
  
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  
  const mode = localStorage.getItem('mode');
  if(!mode) return;
  const rpc = createSolanaRpc(`https://api.${mode==="mainnet"?"mainnet":"devnet"}.solana.com`);
  const rpcSubscriptions = createSolanaRpcSubscriptions(
    `wss://api.${mode==="mainnet"?"mainnet":"devnet"}.solana.com`
  );


  const sender = await createKeyPairSignerFromPrivateKeyBytes(derivedSeed);
  const recipientAddress = recipientBase58Address;
  const recipient = { address: address(recipientAddress) };

  const transferAmount = lamports(BigInt(1000000000 * quantity));

  const transferInstruction = getTransferSolInstruction({
    source: sender,
    destination: recipient.address,
    amount: transferAmount,
  });

  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const transactionMessage = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(sender, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstructions([transferInstruction], tx)
  );

  const signedTransaction =
    await signTransactionMessageWithSigners(transactionMessage);
  await sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions })(
    signedTransaction,
    { commitment: "confirmed" }
  );

  const transactionSignature = getSignatureFromTransaction(signedTransaction);
  return transactionSignature;
};
