import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Stat,
  StatLabel,
  StatNumber,
  Tabs,
  TabPanel,
  TabPanels,
  Text,
  useColorModeValue,
  VStack,
  TabList,
} from "@chakra-ui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbCurrencySolana } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineSwapVert } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";

const buttonBgColor = "gray.400";
const buttonTextColor = "black";

const LiquidityInterface = () => {
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

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
          <InputLeftAddon position="relative" h={24} background="#dff0f5">
            <Text fontSize="xl" px={1}>
              <TbCurrencySolana />
            </Text>
            <Text>HBD</Text>
            <IoMdArrowDropdown />
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
              isRequired
              type="number"
            />
          </Flex>
        </InputGroup>
        <Text fontSize="xs" mt={2}>
          Balance: 129.978543 USDC
        </Text>
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
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              onChange={() => {handleTokenChange("BTC")}}
              type="number"
            />
          </Flex>
        </InputGroup>
        <Stat>
          <StatLabel>Pool Liquidity (HBD)</StatLabel>
          <StatNumber>56,258.97 HBD</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pool Liquidity (BTC)</StatLabel>
          <StatNumber>3,577,468.33 BTC</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>LP Supply</StatLabel>
          <StatNumber>79,333.77 LP</StatNumber>
        </Stat>
      </VStack>
    </Box>
  );
};

export default LiquidityInterface;
