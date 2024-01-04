//TODO: Reloading animation for the different style


import { useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    const reloadTime = setTimeout(() => {
      setIsReload(false);
    }, 3000);
  }, []);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Flex
            direction={"column"}
            w="full"
            borderRadius={6}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex justifyContent={"space-between"} px={5} h={4} mt={2} alignItems={"flex-end"}>
              <Text fontSize={"xs"}>From</Text>
              <Text fontSize={"xs"}>Balance [Wallet not connected]</Text>
            </Flex>

            <Flex>
              <InputLeftAddon
                h={12}
                background="#dff0f5"
                border={"transparent"}
              >
                <Flex
                  _hover={{ background: "#d0ebf2" }}
                  borderRadius={"md"}
                  alignItems={"center"}
                >
                  <Flex
                    cursor={"pointer"}
                    onClick={props.handleOpen}
                    alignItems={"center"}
                  >
                    <Text fontSize={"2xl"} px={1}>
                      <Image
                        src="./hive.svg"
                        alt="hive"
                        width="24"
                        height="24"
                      />
                    </Text>
                    <Text fontSize={"xl"}>HBD</Text>
                  </Flex>
                  <IoMdArrowDropdown />
                </Flex>
                <Box
                  h="60%"
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
                  background={buttonBgColor}
                  color={buttonTextColor}
                  onClick={() => setTokenAmount("Half")}
                  mx={1}
                >
                  Half
                </Button>
              </InputLeftAddon>
              <Input
                h={10}
                w={"full"}
                textAlign={"right"}
                value={tokenAmount}
                onChange={handleTokenChange}
                focusBorderColor="transparent"
                border={"transparent"}
              />
            </Flex>
            <Flex justifyContent={"space-between"} px={5} h={4} mb={2} alignItems={"flex-start"}>
              <Flex></Flex>
              <Flex>
                {" "}
                {tokenAmount && <Text fontSize={"xs"}>Max Value</Text>}
              </Flex>
            </Flex>
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
          <Flex
            direction={"column"}
            w="full"
            borderRadius={6}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex justifyContent={"space-between"} px={5} h={4} mt={2}>
              <Text fontSize={"xs"}>From</Text>
              <Text fontSize={"xs"}>Balance [Wallet not connected]</Text>
            </Flex>

            <Flex>
              <InputLeftAddon
                h={12}
                background="#dff0f5"
                border={"transparent"}
              >
                <Flex
                  _hover={{ background: "#d0ebf2" }}
                  borderRadius={"md"}
                  alignItems={"center"}
                >
                  <Flex
                    cursor={"pointer"}
                    onClick={props.handleOpen}
                    alignItems={"center"}
                  >
                    <Text fontSize={"2xl"} px={1}>
                      <FaBitcoin color="gold" />
                    </Text>
                    <Text fontSize={"xl"}>BTC</Text>
                    <IoMdArrowDropdown />
                  </Flex>
                </Flex>
                <Box
                  h="60%"
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
              <Input
                h={10}
                w={"full"}
                textAlign={"right"}
                value={tokenAmount}
                onChange={handleTokenChange}
                focusBorderColor="transparent"
                border={"transparent"}
                readOnly
              />
            </Flex>
            <Flex justifyContent={"space-between"} px={5} h={4} mb={2}>
              <Flex></Flex>
              <Flex>
                {" "}
                {tokenAmount && <Text fontSize={"xs"}>Max Value</Text>}
              </Flex>
            </Flex>
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
