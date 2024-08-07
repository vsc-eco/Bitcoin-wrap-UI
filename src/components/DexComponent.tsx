//TODO: In Dex Component make the spinner animated once getting the values

import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  VStack,
} from "@chakra-ui/react";

import TokenSearchModal from "./TokenSearchModal";

//importing the components
import LiquidityInterface from "./liquidity/LiquidityInterface";
import SwapComponent from "./Swap/SwapComponent";
import HivePrice from "./HivePrice";
import WBTC from "./WBTC";

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
            <Box>
              <SwapComponent
                showModal={showModal}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
              <HivePrice />
              <WBTC />
            </Box>
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
      </VStack>
    </Flex>
  );
};

export default DexComponent;
