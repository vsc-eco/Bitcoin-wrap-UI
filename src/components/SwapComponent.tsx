
//TODO: adding the max and half functionality

import { useEffect } from "react";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  useColorModeValue,
  InputLeftAddon,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbCurrencySolana } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineSwapVert } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import Image from "next/image";

//importing motion component from framer
import { motion } from "framer-motion";

type Props = {
  showModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const SwapComponent = (props: Props) => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [IsReload, setIsReload] = useState(true);

  useEffect(() => {
    const reloadTime = setTimeout(() => {
      setIsReload(false);
    }, 3000);
  }, []);

  const handleSolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(event.target.value);
  };

  const buttonBgColor = "#b8e3f2";
  const buttonTextColor = useColorModeValue("blue.600", "blue.800");

  return (
    <Flex
      justifyContent={"center"}
      p={5}
      maxW="600px"
      borderRadius="md"
      boxShadow="base"
      background="#f5f9fa"
    >
      <VStack spacing={3}>
        <InputGroup>
          <InputLeftAddon
            position={"relative"}
            h={16}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex
              _hover={{ background: "#d0ebf2" }}
              p={1}
              borderRadius={"md"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex
                cursor={"pointer"}
                onClick={props.handleOpen}
                alignItems={"center"}
              >
                <Text fontSize={"2xl"} px={1}>
                  <Image src="./hive.svg" alt="hive" width="24" height="24" />
                </Text>
                <Text fontSize={"xl"}>HBD</Text>
              </Flex>
              <IoMdArrowDropdown />
            </Flex>
            <Text fontSize={"xs"} position={"absolute"} top={0}>
              From
            </Text>
            <Box
              h="100%"
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
              top={0}
              right={1}
              zIndex={5}
              fontSize={"xs"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={0}
              right={1}
              zIndex={5}
              fontSize={"xs"}
            >
              $41,2300
            </Text>
            <Input
              h={16}
              w={"full"}
              textAlign={"right"}
              value={tokenAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              border={"transparent"}
              focusBorderColor="transparent"
              isRequired
              type="number"
            />
          </Flex>
        </InputGroup>
        <Flex
          h={5}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="90%"
        >
          <Flex px={4} alignItems={"center"}>
            <Text fontSize={"2xl"}>
              <MdOutlineSwapVert />
            </Text>
          </Flex>
          <Flex>
            {IsReload ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3 }}
              >
                <AiOutlineLoading3Quarters />
              </motion.div>
            ) : (
              <AiOutlineLoading3Quarters />
            )}
          </Flex>
        </Flex>

        <InputGroup>
          <InputLeftAddon
            position={"relative"}
            h={16}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex
              _hover={{ background: "#d0ebf2" }}
              p={1}
              borderRadius={"md"}
              alignItems={"center"}
            >
              <Flex
                cursor={"pointer"}
                onClick={props.handleOpen}
                alignItems={"center"}
              >
                <Text fontSize={"2xl"} px={1}>
                  <FaBitcoin color="gold"/>
                </Text>
                <Text fontSize={"xl"}>BTC</Text>
                <IoMdArrowDropdown />
              </Flex>
            </Flex>
            <Text fontSize={"xs"} position={"absolute"} top={0}>
              To
            </Text>
            <Box
              h="100%"
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
              top={0}
              right={1}
              zIndex={5}
              fontSize={"xs"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={0}
              right={1}
              zIndex={5}
              fontSize={"xs"}
            >
              $41,2300
            </Text>
            <Input
              h={16}
              w={"full"}
              textAlign={"right"}
              value={tokenAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              border={"transparent"}
              readOnly
            />
          </Flex>
        </InputGroup>
        <Button colorScheme="blue" w="full" mt={5}>
          Swap
        </Button>
      </VStack>
    </Flex>
  );
};

export default SwapComponent;
