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
  const [showTransaction, setShowTransaction] = useState(true);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showTradeComp, setShowTradeComp] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [showDex, setShowDex] = useState(true);
  const { myDid } = useAccountContext();

  //function for handling the TransactionModal
  const handleTransactionOnClick = () => {
    setShowTransaction(true);
    setShowDex(false);
    setShowExchangeModal(false);
    setShowTradeComp(false);
  };

  //function for handling the TransactionModal
  const handleExchangeOnClick = () => {
    setShowTransaction(false);
    setShowDex(false);
    setShowExchangeModal(true);
    setShowTradeComp(false);
  };

  //function for handling the TradeModal
  const handleTradeComponent = () => {
    setShowTradeComp(true);
    setShowDex(false);
    setShowTransaction(false);
    setShowExchangeModal(false);
  };

  //function for handling the dex component
  const handleDexComponent = () => {
    setShowExchangeModal(false);
    setShowTransaction(false);
    setShowTradeComp(false);
    setShowDex(true);
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
        {myDid && showTransaction && !showTradeComp && !showDex && (
          <Transaction />
        )}
        {myDid && !showTransaction && showTradeComp && !showDex && (
          <Dashboard />
        )}
        {myDid && !showTransaction && !showTradeComp && !showDex && (
          <ThirdSection />
        )}
        {myDid && !showTransaction && !showExchangeModal && showDex && (
          <DexComponent />
        )}
      </Flex>
    </Flex>
  );
};

export default SecondSection;
