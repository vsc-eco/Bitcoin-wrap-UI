import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";

//importing the components
import LiquidityInterface from "./LiquidityInterface";
import SwapComponent from "./SwapComponent";

const DexComponent = () => {
  const [activeTab, setActiveTab] = useState<"swap" | "liquidity">("swap");

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
          {activeTab === "swap" && <SwapComponent />}

          {activeTab === "liquidity" && <LiquidityInterface />}
        </Flex>

        <Button colorScheme="blue" width="70%">
          {activeTab === "swap" ? "Swap" : "Enter an amount"}
        </Button>
      </VStack>
    </Flex>
  );
};

export default DexComponent;
