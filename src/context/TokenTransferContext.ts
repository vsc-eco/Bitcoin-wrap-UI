// context/TokenTransferContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TokenTransferContextProps {
  tokenAmount: number | null
}

const TokenTransferContext = createContext<TokenTransferContextProps | null>(null); //initialiized null

export const TokenTransferProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokenAmount, setTokenAmount] = useState<number | null>(null);



  return (
    <TokenTransferContext.Provider value={{ tokenAmount, setTokenAmount }}>
      {children}
    </TokenTransferContext.Provider>
  );
};

export const useTokenTransfer = () => {
  const context = useContext(TokenTransferContext);
  if (!context) {
    throw new Error('useTokenTransfer must be used within a TokenTransferProvider');
  }
  return context;
};
