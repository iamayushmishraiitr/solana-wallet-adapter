import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL ,  Transaction} from "@solana/web3.js";

const ShowBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);

  const getUserBalance = async () => {
    if (publicKey) {
      const balanceInLamports = await connection.getBalance(publicKey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    if (!publicKey) return;

    getUserBalance(); // Initial fetch

    const interval = setInterval(() => {
      getUserBalance();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [publicKey]);


  return (
    <div className=" text-white ">
      Balance: {balance?.toFixed(5)} SOL
    </div>
  );
};

export default ShowBalance;
