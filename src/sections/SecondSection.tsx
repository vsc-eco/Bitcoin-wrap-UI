"use client";
import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import LoginComponent from "../components/LoginComponent";
import ThirdSection from "./ThirdSection";
import { useAccountContext } from "../context/AccountContext";

type Props = {};

const SecondSection = (props: Props) => {
  const [showTransaction, setShowTransaction] = useState(true);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const {myDid} = useAccountContext()

  //function for handling the TransactionModal
  const handleTransactionOnClick = () => {
    setShowTransaction(true);
    setShowExchangeModal(false);
  };

  //function for handling the TransactionModal
  const handleExchangeOnClick = () => {
    setShowTransaction(false);
    setShowExchangeModal(true);
  };

  //check for the login
  // const handleCheckLogin = () => {
  //   const user = localStorage.getItem("login.auth");
  //   if (user) {
  //     setShowLogin(!showLogin);
  //   }
  // };
  // // for intervals of seconds
  // useEffect(() => {
  //   handleCheckLogin();
  // }, []);

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
        />
      </Flex>
      <Flex w="70%" id="transaction-swap" m={0} p={0}>
        {!myDid && <LoginComponent />}
        {myDid && (showTransaction ? <Transaction /> : <ThirdSection />)}
      </Flex>
    </Flex>
  );
};

export default SecondSection;
