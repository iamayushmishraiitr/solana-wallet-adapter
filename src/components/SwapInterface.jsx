import React, { useState, useEffect } from "react";
import { ArrowDownUp, Settings, Coins, Send } from "lucide-react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AirDrop from "./AirDrop";
import SendTokens from "./SendTokens";
import ShowBalance from "./ShowBalance";

export const SwapInterface = () => {
  const [activeTab, setActiveTab] = useState("airdrop");
  const {publicKey}= useWallet() ;
  const TabButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
        activeTab === tab
          ? "bg-[#2172e5] text-white"
          : "text-gray-400 hover:text-white"
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center w-[500px] h-full">
      <div className="w-[480px] bg-[#191b1f] rounded-3xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <TabButton tab="airdrop" icon={Coins} label="Airdrop" />
            <TabButton tab="send" icon={Send} label="Send" />
            {activeTab === "send" && publicKey && (
              <ShowBalance />
            )}
          </div>
        </div>
        <div>
          {activeTab === "airdrop" && <AirDrop />}
          {activeTab === "send" && <SendTokens />}
        </div>
      </div>

      {/* Centered button */}
      <div className="flex justify-center mt-4 w-full gap-5 items-center">
        {publicKey && <h1 className="text-white text-2xl">From: {publicKey.toBase58()}</h1>}
        <WalletMultiButton
          style={{
            backgroundColor: "#2172e5",
            width: "300px",
            height: "48px",
            fontSize: "1.125rem",
            borderRadius: "1rem",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
