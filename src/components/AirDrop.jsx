import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
const AirDrop = () => {
  const {publicKey} =useWallet() ;
  const {connection}=useConnection() ;

    const requestAirdrop = async () => {
        if (!publicKey) return;
        try {
          const signature = await connection.requestAirdrop(
            publicKey,
            LAMPORTS_PER_SOL
          );
          await connection.confirmTransaction(signature);
          alert("Airdrop successful!");
        } catch (error) {
          console.error("Airdrop failed:", error);
          alert("Airdrop failed. Please try again.");
        }
      };
  return (
    <div className="space-y-4">
              <div className="bg-[#212429] rounded-2xl p-4">
                <p className="text-white mb-2">
                  Request SOL from Devnet Faucet
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  This will request 1 SOL from the Solana Devnet faucet.
                </p>
              </div>
              <button
                onClick={requestAirdrop}
                className="w-full bg-[#2172e5] hover:bg-[#1a5bb6] text-white py-4 rounded-2xl font-medium"
              >
                Request Airdrop
              </button>
            </div>
  )
}

export default AirDrop