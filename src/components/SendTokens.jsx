import React, { useState } from "react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,

} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"; 



const SendTokens = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const {connection}= useConnection() 
  const handleSendSol = async () => {
    if (!publicKey || !sendAmount || !recipientAddress) {
      alert("Please fill all fields and connect wallet.");
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipientAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: parseFloat(sendAmount) * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      alert(`Transaction successful! Signature: ${signature}`);
      setRecipientAddress("");
      setSendAmount("");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please check the address and try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#212429] rounded-2xl p-4">
        <h1 className="text-white text-center mb-4">You are sending:</h1>
        <div className="w-full h-[300px] flex items-center justify-center">
          <input
            type="number"
            placeholder="Amount (SOL)"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            className="bg-transparent text-white text-2xl text-center outline-none w-full h-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#212429] rounded-2xl p-4">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full bg-transparent text-white outline-none mb-4 mt-6"
          />
        </div>
      </div>

      <button
        onClick={handleSendSol}
        className="w-full bg-[#2172e5] hover:bg-[#1a5bb6] text-white py-4 rounded-2xl font-medium"
      >
        Send SOL
      </button>
    </div>
  );
};

export default SendTokens;
