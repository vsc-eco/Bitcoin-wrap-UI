import React, { useState, createContext } from "react";

interface TokenProps {
  myValue: number | null;
  updateValue: (newValue: number) => void;
  isFilled: boolean;
}

// Create a Context
export const MyContext = createContext<TokenProps | undefined>(undefined);

export function TokenAmountProvider({ children }) {
  // State that you want to share
  const [myValue, setMyValue] = useState<number | null>(null);
  const [isFilled, setIsFilled] = useState(false);

  const updateValue = (newValue: number) => {
    setMyValue(newValue);
    if (newValue !== 0) {
      setIsFilled(true);
    }
  };

  return (
    <MyContext.Provider value={{ myValue, updateValue, isFilled }}>
      {children}
    </MyContext.Provider>
  );
}
