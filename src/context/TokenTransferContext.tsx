import React, { useState, createContext, useContext } from 'react';

interface TokenProps {
  myValue: number | null
  updateValue: (newValue: number )=> void;
}
// Create a Context
export const MyContext = createContext<TokenProps | undefined>(undefined);

export function TokenAmountProvider({ children }) {
  // State that you want to share
  const [myValue, setMyValue] = useState(null);

  // Function to update the state
  const updateValue = newValue => {
    setMyValue(newValue);
  };

  return (
    <MyContext.Provider value={{ myValue: myValue, updateValue }}>
      {children}
    </MyContext.Provider>
  );
}