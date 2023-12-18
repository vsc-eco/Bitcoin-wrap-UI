
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import TokenSearchModal from "./TokenSearchModal";

//importing the components
import LiquidityInterface from "./LiquidityInterface";
import SwapComponent from "./SwapComponent";

const DexComponent = () => {
  const [activeTab, setActiveTab] = useState<"swap" | "liquidity">("swap");

  //make the hookstate for rendering the transfer token modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //make a function handleChange for the transfer token modal
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Flex alignItems={"center"}>
      <VStack
        w={["700px"]}
        h={"700px"}
        p={4}
        borderRadius="md"
        boxShadow="base"
        spacing={4}
        background="white"
      >
        <ButtonGroup isAttached variant="outline">
          <Button
            borderRadius={"3xl"}
            w={24}
            colorScheme="blue"
            variant={activeTab === "swap" ? "solid" : "outline"}
            onClick={() => setActiveTab("swap")}
          >
            Swap
          </Button>
          <Button
            borderRadius={"3xl"}
            colorScheme="blue"
            variant={activeTab === "liquidity" ? "solid" : "outline"}
            onClick={() => setActiveTab("liquidity")}
          >
            Liquidity
          </Button>
        </ButtonGroup>

        <Flex w={"600px"} justifyContent={"center"} alignItems={"center"}>
          {activeTab === "swap" && (
            <SwapComponent
              showModal={showModal}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          )}

          <TokenSearchModal isOpen={showModal} onClose={handleClose} />

          {activeTab === "liquidity" && (
            <LiquidityInterface
              showModal={showModal}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          )}
        </Flex>
        <Button colorScheme="blue" width="70%">
          {activeTab === "swap" ? "Swap" : "Enter an amount"}
        </Button>
      </VStack>
    </Flex>
  );
};

export default DexComponent;
