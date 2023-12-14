"use client";
import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import LoginComponent from "../components/LoginComponent";
import ThirdSection from "./ThirdSection";
import { useAccountContext } from "../context/AccountContext";
import Dashboard from "../components/Dashboard";
import DexComponent from "../components/DexComponent";

type Props = {};

const SecondSection = (props: Props) => {
  const { myDid } = useAccountContext();
  
  //intialize the variable useState variable
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

  return (
    //updates only for desktop view no mobile view from now
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
      <Flex w="70%" id="transaction-swap" m={0} p={0}>
        {!myDid && <LoginComponent />}
        {/* showing it default  */}
        {myDid && (render === "transaction" || render === "") && (
          <Transaction />
        )}

        {myDid && render === "trade" && <Dashboard />}
        {myDid && render === "exchange" && <ThirdSection />}
        {myDid && render === "dex" && <DexComponent />}
      </Flex>
    </Flex>
  );
};

export default SecondSection;
