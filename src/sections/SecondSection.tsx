"use client";
import React, { useState } from "react";
import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeModal from "../components/ExchangeModal";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import Hamburger from "../components/Hamburger";

//export the context file 
import { useShowComponent } from "../context/ShowComponent"

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

    const { showComponent } = useShowComponent();

    if (showComponent) {
        return null
    }

    return (
        // <Flex w="100%" h="90vh" justifyContent="center">
        //   <Flex w="80%">
        //     <Flex w="100%" justifyContent="center" >
        //       <Flex display={["none", "none", "none", "block"]} px={12} alignItems="center">
        // <Sidebar
        //   handleExchangeOnClick={handleExchangeOnClick}
        //   handleTransactionOnClick={handleTransactionOnClick}
        // />
        //       </Flex>
        //       <Flex display={["block", "block", "block", "none"]} px={4}>
        //         <Hamburger />
        //       </Flex>
        // <Flex>{showTransaction ? <Transaction /> : <ExchangeModal />}</Flex>
        //     </Flex>
        //   </Flex>
        // </Flex>

        //updates only for desktop view no mobile view from now
        <Flex w="100%" h="90vh">
      <Flex w="30%" id="sidebar" alignItems="center" justifyContent="end" mx={10}>
        <Sidebar
          handleExchangeOnClick={handleExchangeOnClick}
          handleTransactionOnClick={handleTransactionOnClick}
        />
      </Flex>
      <Flex w="70%" id="transaction-swap" m={0} p={0}>
      {showTransaction ? <Transaction /> : <ExchangeModal />}
      </Flex>
    </Flex>
    );


};

export default SecondSection;