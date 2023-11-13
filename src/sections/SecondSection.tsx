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
  };

  //function for handling the TransactionModal
  const handleExchangeOnClick = () => {
    setShowTransaction(false);
    setShowExchangeModal(true);
  };

  return (
    <Flex w="100%" h="90vh" justifyContent="center">
      <Flex w="90%">
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Flex display={["none", "none", "none", "block"]} px={12}>
            <Sidebar
              handleExchangeOnClick={handleExchangeOnClick}
              handleTransactionOnClick={handleTransactionOnClick}
            />
          </Flex>
          <Flex display={["block", "block", "block", "none"]} px={4}>
            <Hamburger />
          </Flex>
          <Flex>{showTransaction ? <Transaction /> : <ExchangeModal />}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SecondSection;
