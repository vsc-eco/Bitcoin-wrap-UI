//TODO: In Dex Component make the spinner animated once getting the values
//TODO: rename the components to swap and liquidity  
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  VStack,
  Text
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
  const [token, setToken] = useState("")

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
        borderRadius="md"
        spacing={4}
      >
        <ButtonGroup isAttached>
          <Button
            borderRadius={"xl"}
            w={24}
            colorScheme={"gray"}
            variant={activeTab === "swap" ? "solid" : "outline"}
            onClick={() => setActiveTab("swap")}
          >
            <Text fontSize={"md"} >Swap</Text>
          </Button>
          <Button
            borderRadius={"xl"}
            w={24}
            colorScheme={"gray"}
            variant={activeTab === "liquidity" ? "solid" : "outline"}
            onClick={() => setActiveTab("liquidity")}
          >
           <Text>Liquidity</Text>
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
              {/* TODO move into Swap */}
              <HivePrice />
              <WBTC />
            </Box>
          )}

          <TokenSearchModal isOpen={showModal} onClose={handleClose} setToken={setToken} />

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
