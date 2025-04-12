import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

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
    getUserBalance();
  }, [publicKey]);

  return (
    <div className=" text-white ">
      Balance: {balance?.toFixed(5)} SOL
    </div>
  );
};

export default ShowBalance;
