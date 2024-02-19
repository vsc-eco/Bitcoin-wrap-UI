"use client";
import React, { useLayoutEffect, useReducer, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import ThirdSection from "./ThirdSection";
import { useAccountContext } from "../context/AccountContext";
import Dashboard from "../components/Dashboard";
import DexComponent from "../components/DexComponent";
import SignUpComponent from "../components/Login/SignUpComponent";
import { ResolveUsername } from "../hooks/Hive";

type Props = {};

const initialState = {
  render: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RENDER":
      return {
        ...state,
        render: action.payload
      }
      default: 
      return state
  }
};


const SecondSection = (props: Props) => {
  const { myDid } = useAccountContext();
  const [isClient, setClient] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer,  initialState);




  const handleTransactionOnClick = () => {
    dispatch({ type: 'SET_RENDER',  payload: "transaction"});
  };

  const handleExchangeOnClick = () => {
    dispatch({ type: 'SET_RENDER', payload: "exchange"})
  };

  const handleTradeComponent = () => {
    dispatch({ type:"SET_RENDER", payload: "trade"})
  };
  
  const handleDexComponent = () => {
    dispatch({ type:"SET_RENDER", payload: "dex"})
  };

  const handleSignUpComponent = () => {
    dispatch({ type:"SET_RENDER", payload: "signup"})
  };

  useLayoutEffect(() => {
    setClient(true);
    return () => {
      setClient(false);
    };
  }, []);

  return (
    <Flex w="100%" h="100vh">
      <Flex
        w="30%"
        id="sidebar"
        alignItems="center"
        justifyContent="end"
        mx={10}
      >
        <Sidebar
          handleExchangeOnClick={handleExchangeOnClick}
          handleTransactionOnClick={handleTransactionOnClick}
          handleDexComponent={handleDexComponent}
          handleTradeComponent={handleTradeComponent}
          handleSignUpComponent={handleSignUpComponent}
          resolveUsername={ResolveUsername("vaultec")}
        />
      </Flex>
      {isClient && window.location.hostname !== "wrap.vsc.eco" ? (

        <Flex w="70%" id="transaction-swap" m={0} p={0}>
          {!myDid && state.render === 'signup' && <SignUpComponent />}
          {/* showing it default  */}
          {myDid && (state.render === "transaction" || state.render === "") && (
            <Transaction />
          )}

          {myDid && state.render === "trade" && <Dashboard />}
          {myDid && state.render === "exchange" && <ThirdSection />}
          {myDid && state.render === "dex" && <DexComponent />}
        </Flex>
      ) : (
        <Flex h={720} w={720} alignItems={"center"} justifyContent={"center"}>
          <Text fontSize={"2xl"}>Coming soon in production!</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default SecondSection;
