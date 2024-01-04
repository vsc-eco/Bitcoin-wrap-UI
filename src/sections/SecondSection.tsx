"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import ThirdSection from "./ThirdSection";
import { useAccountContext } from "../context/AccountContext";
import Dashboard from "../components/Dashboard";
import DexComponent from "../components/DexComponent";
import SignUpComponent from "../components/Login/SignUpComponent";


type Props = {};

const SecondSection = (props: Props) => {
  const { myDid } = useAccountContext();

  const [render, setRender] = useState<string>("");

  const handleTransactionOnClick = () => {
    setRender("transaction");
  };

  //function for handling the TransactionModal
  const handleExchangeOnClick = () => {
    setRender("exchange");
  };

  //function for handling the TradeModal
  const handleTradeComponent = () => {
    setRender("trade");
  };

  //function for handling the dex component
  const handleDexComponent = () => {
    setRender("dex");
  };

  //for defining of the window object 
  const isBrowser = typeof window !== "undefined";
  return (
    <Flex w="100%" h="90vh">
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
        />
      </Flex>
      { isBrowser && window.location.hostname != "wrap.vsc.eco" ? (
        <Flex w="70%" id="transaction-swap" m={0} p={0}>
          {!myDid && <SignUpComponent />}
          {/* showing it default  */}
          {myDid && (render === "transaction" || render === "") && (
            <Transaction />
          )}

          {myDid && render === "trade" && <Dashboard />}
          {myDid && render === "exchange" && <ThirdSection />}
          {myDid && render === "dex" && <DexComponent />}
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
