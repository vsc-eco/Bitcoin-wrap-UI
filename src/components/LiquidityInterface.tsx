
import React, { experimental_useEffectEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex, // Fix: Remove duplicated import statement
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbCurrencySolana } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBitcoin } from "react-icons/fa";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { CgArrowsExchange } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

//importing motion component from framer
import { motion } from "framer-motion";

type Props = {
  showModal: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const LiquidityInterface = (props: Props) => {
  const [tokenAmount, setTokenAmount] = useState<{ [key: string]: string }>({
    HBD: "",
    BTC: "",
  });

  const handleTokenChange =
    (token: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setTokenAmount({
        ...tokenAmount,
        [token]: event.target.value,
      });
    };

  const handleMax = (token: string) => {
    // Replace this with actual max balance logic
    const maxBalances = {
      HBD: "0.28957553",
      BTC: "129.978543",
    };
    setTokenAmount((prevTokenAmount) => ({
      ...prevTokenAmount,
      [token]: maxBalances[token],
    }));
  };

  //useState for reloading
  const [IsReload, setIsReload] = useState(true);


  useEffect(()=>{
  const reloadTime = setTimeout(()=>{
     setIsReload(false);
  }, 3000)
  }, [])

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonTextColor = useColorModeValue("blue.600", "blue.800");
  const buttonBgColor = "#b8e3f2";

  return (
    <Box
      maxW="600px"
      bg={bgColor}
      p={4}
      borderRadius="md"
      boxShadow="base"
      background="#f5f9fa"
    >
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftAddon
            position="relative"
            h={24}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex _hover={{ background: "#d0ebf2" }} p={1} borderRadius={"md"} alignItems={"center"}>
              <Flex cursor={"pointer"} alignItems={"center"}>
                <Text fontSize="xl" px={1}>
                  <TbCurrencySolana />
                </Text>
                <Text>HBD</Text>
                <IoMdArrowDropdown />
              </Flex>
            </Flex>
            <Text fontSize="xs" position="absolute" top={2}>
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
              onClick={() => handleMax("HBD")}
              mx={1}
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="xs"
              bg={buttonBgColor}
              color={buttonTextColor}
              borderColor={borderColor}
              onClick={() =>
                setTokenAmount({
                  ...tokenAmount,
                  HBD: (parseFloat(tokenAmount.HBD) / 2).toString(),
                })
              }
              mx={1}
            >
              Half
            </Button>
          </InputLeftAddon>
          <Flex position="relative">
            <Text
              position="absolute"
              top={2}
              right={2}
              zIndex={5}
              fontSize="xs"
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position="absolute"
              bottom={2}
              right={2}
              zIndex={5}
              fontSize="xs"
            >
              $41,2300
            </Text>
            <Input
              h={24}
              w="full"
              textAlign="right"
              value={tokenAmount["HBD"]}
              onChange={handleTokenChange("HBD")}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              border={"transparent"}
              isRequired
              type="number"
            />
          </Flex>
        </InputGroup>
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <Flex alignItems={"center"}>
            <Text>
              <FaPlus />
            </Text>
            <Text fontSize="xs" mt={1} px={1}>
              Balance: 129.978543 USDC
            </Text>
            <Text>
              <CgArrowsExchange />
            </Text>
          </Flex>
          <Flex alignItems={"center"} w={12} justifyContent={"space-between"}>
            <Text  onClick={props.handleOpen} _hover={{ background: "#d0ebf2" }} p={1} borderRadius={"lg"} cursor={"pointer"}>
              <HiMiniMagnifyingGlass />
            </Text>
            <Text>
            {IsReload ? (
              <motion.div animate={{ rotate: 360 }} transition={{duration: 3}}>
                  <AiOutlineLoading3Quarters />
              </motion.div>
            ) : (
              <AiOutlineLoading3Quarters />
            )}
            </Text>
          </Flex>
        </Flex>
        <InputGroup>
          <InputLeftAddon
            position={"relative"}
            h={24}
            background="#dff0f5"
            border={"transparent"}
          >
            <Flex _hover={{ background: "#d0ebf2" }} p={1} borderRadius={"md"} alignItems={"center"}>
              <Flex cursor={"pointer"} alignItems={"center"}>
                <Text fontSize={"xl"} px={1}>
                  <FaBitcoin />
                </Text>
                <Text>BTC</Text>
                <IoMdArrowDropdown />
              </Flex>
            </Flex>
            <Text fontSize={"xs"} position={"absolute"} top={2}>
              To
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
              onClick={() => handleMax("BTC")}
              mx={1}
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="xs"
              background={buttonBgColor}
              color={buttonTextColor}
              onClick={() =>
                setTokenAmount({
                  ...tokenAmount,
                  BTC: (parseFloat(tokenAmount.BTC) / 2).toString(),
                })
              }
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
              value={tokenAmount["BTC"]}
              onChange={() => {
                handleTokenChange("BTC");
              }}
              borderRadius="0px 6px 6px 0px"
              border={"transparent"}
              background="#dff0f5"
              focusBorderColor="transparent"
              type="number"
            />
          </Flex>
        </InputGroup>
        <Flex
          m={"auto"}
          direction={"column"}
          border={"solid"}
          borderWidth={"1px"}
          w="full"
          borderRadius={"lg"}
          p={4}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Text>Base</Text>
            </Flex>
            <Flex>
              <Text>HBD</Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Text>Pool Liquidity (HBD)</Text>
            </Flex>
            <Flex>
              <Text>3232 HBD</Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Text>Pool liquidity (BTC)</Text>
            </Flex>
            <Flex>
              <Text>3238 BTC</Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Text>LP supply</Text>
            </Flex>
            <Flex>
              <Text>327382372 LP</Text>
            </Flex>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LiquidityInterface;
