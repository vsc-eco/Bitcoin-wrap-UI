"use client";
import React, { useState } from "react";
import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import ExchangeModal from "../components/ExchangeModal";
import Sidebar from "../components/Sidebar";
import Transaction from "../transactions/Transaction";
import Hamburger from "../components/Hamburger";

type Props = {};

const SecondSection = (props: Props) => {
  const [showTransaction, setShowTransaction] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <Flex w="full" h="70vh" alignItems="center" justifyContent="space-between">
      <Flex display={["none","none", "none", "block"]} px={4}>
        <Sidebar />
      </Flex>
      <Flex display={["block","block", "block", "none"]} px={4}>
        <Hamburger />
      </Flex>
      <Flex>
        {showTransaction ? <Transaction /> : <ExchangeModal />}
      </Flex>
    </Flex>
  );
};

export default SecondSection;
