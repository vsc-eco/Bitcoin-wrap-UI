// TODO: updating and modifying the component

import {
  Button,
  Flex,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftAddon,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbCurrencySolana } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineSwapVert } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";

type Props = {};

const SwapComponent = (props: Props) => {
  const [tokenAmount, setTokenAmount] = useState<string>("");

  const handleSolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(event.target.value);
  };

  const buttonBgColor = "gray.400";
  const buttonTextColor = useColorModeValue("white", "gray.800");

  return (
    <Flex justifyContent={"center"} w={"full"}>
      <Flex flexDirection="column">
        <InputGroup>
          <InputLeftAddon position={"relative"} h={24} background="#dff0f5">
            <Text fontSize={"xl"} px={1}>
              <TbCurrencySolana />
            </Text>
            <Text>HBD</Text>
            <IoMdArrowDropdown />
            <Text fontSize={"xs"} position={"absolute"} top={2}>
              From
            </Text>
            <Box
              h="50%"
              borderLeft="1px solid black"
              mx={1}
              alignSelf="center"
            ></Box>
            <Button
              h="1.75rem"
              size="xs"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setTokenAmount("Max")}
              mx={1}
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="xs"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setTokenAmount("Half")}
              mx={1}
            >
              Half
            </Button>
          </InputLeftAddon>
          <Flex position="relative">
            <Text
              position={"absolute"}
              top={2}
              right={2}
              zIndex={5}
              fontSize={"xs"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={2}
              right={2}
              zIndex={5}
              fontSize={"xs"}
            >
              $41,2300
            </Text>
            <Input
              h={24}
              w={"full"}
              textAlign={"right"}
              value={tokenAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              isRequired
              type="number"
            />
          </Flex>
        </InputGroup>
        <Flex
          h={24}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="90%"
        >
          <Flex px={4} alignItems={"center"}>
            <Text fontSize={"2xl"}>
              <MdOutlineSwapVert />
            </Text>
            <Text fontSize="xs" my={2} textAlign="center">
              1 SOL ≈ 83.58375 USDC
            </Text>
          </Flex>
          <Flex>
            <Text>
              <AiOutlineLoading3Quarters />
            </Text>
          </Flex>
        </Flex>

        <InputGroup>
          <InputLeftAddon position={"relative"} h={24} background="#dff0f5">
            <Text fontSize={"xl"} px={1}>
              <FaBitcoin />
            </Text>
            <Text>BTC</Text>
            <IoMdArrowDropdown />
            <Text fontSize={"xs"} position={"absolute"} top={2}>
              From
            </Text>
            <Box
              h="50%"
              borderLeft="1px solid black"
              mx={1}
              alignSelf="center"
            ></Box>
            <Button
              h="1.75rem"
              size="xs"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setTokenAmount("Max")}
              mx={1}
              isDisabled
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="xs"
              background={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setTokenAmount("Half")}
              mx={1}
              isDisabled
            >
              Half
            </Button>
          </InputLeftAddon>
          <Flex position="relative">
            <Text
              position={"absolute"}
              top={2}
              right={2}
              zIndex={5}
              fontSize={"xs"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={2}
              right={2}
              zIndex={5}
              fontSize={"xs"}
            >
              $41,2300
            </Text>
            <Input
              h={24}
              w={"full"}
              textAlign={"right"}
              value={tokenAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              readOnly
            />
          </Flex>
        </InputGroup>
        <Text fontSize="xs" mt={2}>
          Balance: 129.978543 USDC
        </Text>
      </Flex>
    </Flex>
  );
};

export default SwapComponent;
