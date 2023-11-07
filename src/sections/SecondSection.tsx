"use client";
import React, { useState } from "react";
import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeModal from "../components/ExchangeModal";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import Hamburger from "../components/Hamburger";

type Props = {};

const SecondSection = (props: Props) => {
  const [showTransaction, setShowTransaction] = useState(true);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  //function for handling the TransactionModal
  const handleTransactionOnClick = () => {
    setShowTransaction(true);
    setShowExchangeModal(false);
  }

  //function for handling the TransactionModal
  const handleExchangeOnClick = () => {
    setShowTransaction(false);
    setShowExchangeModal(true);
  }

  return (
    <Flex w="100%" h="90vh"  justifyContent="center" >
    <Flex w="70%" justifyContent="space-between" alignItems="center">
      <Flex  display={["none","none", "none", "block"]} px={4}>
        <Sidebar handleExchangeOnClick={handleExchangeOnClick} handleTransactionOnClick={handleTransactionOnClick}/>
      </Flex>
      <Flex display={["block","block", "block", "none"]} px={4}>
        <Hamburger />
      </Flex>
      {/* TODO Making this section wider! like 80% */}
      <Flex px={5}>
        {showTransaction ? <Transaction /> : <ExchangeModal />}
      </Flex>
    </Flex>
    </Flex>
  );
};

export default SecondSection;
