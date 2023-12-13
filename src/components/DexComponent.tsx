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
  useColorModeValue,
} from "@chakra-ui/react";

import LiquidityInterface from "./LiquidityInterface";

const DexComponent = () => {
  const [solAmount, setSolAmount] = useState<string>("");
  const [usdcAmount, setUsdcAmount] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"swap" | "liquidity">("swap");

  const handleSolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolAmount(event.target.value);
  };

  const handleUsdcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsdcAmount(event.target.value);
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const buttonBgColor = useColorModeValue("blue.500", "blue.200");
  const buttonTextColor = useColorModeValue("white", "gray.800");

  return (
    <Flex alignItems={"center"}>
      <VStack
        w={["700px"]}
        h={"600px"}
        bg={bgColor}
        p={4}
        borderRadius="md"
        boxShadow="base"
        spacing={4}
        background="#f5f9fa"
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

        {activeTab === "swap" && (
          <Flex width="full" flexDirection="column">
            <InputGroup>
              <Input
                placeholder="SOL"
                value={solAmount}
                onChange={handleSolChange}
                borderRadius={6}
                background="#dff0f5"
                focusBorderColor="transparent"
                isRequired
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  bg={buttonBgColor}
                  color={buttonTextColor}
                  onClick={() => setSolAmount("Max")}
                >
                  Max
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="sm" mt={2}>
              Balance: 0.28957553 SOL
            </Text>
            <Text fontSize="sm" my={2} textAlign="center">
              1 SOL ≈ 83.58375 USDC
            </Text>
            <InputGroup>
              <Input
                placeholder="USDC"
                value={usdcAmount}
                onChange={handleUsdcChange}
                borderRadius={6}
                background="#dff0f5"
                focusBorderColor="transparent"
                isRequired
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  bg={buttonBgColor}
                  color={buttonTextColor}
                  onClick={() => setUsdcAmount("Max")}
                >
                  Max
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="sm" mt={2}>
              Balance: 129.978543 USDC
            </Text>
          </Flex>
        )}

        {activeTab === "liquidity" && <LiquidityInterface />}

        <Button colorScheme="blue" width="full" mt={4}>
          {activeTab === "swap" ? "Swap" : "Add Liquidity"}
        </Button>
      </VStack>
    </Flex>
  );
};

export default DexComponent;
