import React from 'react';
import { WalletContextProvider } from './components/WalletContextProvider';
import { SwapInterface } from './components/swapInterface.jsx';

function App() {
  return (
    <WalletContextProvider>
      <div className="bg-[#0d0e12] flex items-center justify-center min-h-screen">
        <SwapInterface />
      </div>
    </WalletContextProvider>
  );
}

export default App;