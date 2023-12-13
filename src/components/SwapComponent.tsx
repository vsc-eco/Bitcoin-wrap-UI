// TODO: updating and modifying the component
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
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

type Props = {};

const SwapComponent = (props: Props) => {
  const [solAmount, setSolAmount] = useState<string>("");
  const [usdcAmount, setUsdcAmount] = useState<string>("");

  const handleSolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolAmount(event.target.value);
  };

  const handleUsdcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsdcAmount(event.target.value);
  };

  const bgColor = "white";
  const buttonBgColor = useColorModeValue("blue.500", "blue.200");
  const buttonTextColor = useColorModeValue("white", "gray.800");

  return (
    <Flex>
      <Flex flexDirection="column" justifyContent={"center"}>
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
              size="sm"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setSolAmount("Max")}
              mx={1}
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="sm"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setSolAmount("Half")}
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
              fontSize={"sm"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={2}
              right={2}
              zIndex={5}
              fontSize={"sm"}
            >
              $41,2300
            </Text>
            <Input
              h={24}
              w={"full"}
              textAlign={"right"}
              value={solAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              isRequired
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
            <Text fontSize="sm" my={2} textAlign="center">
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
              size="sm"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setSolAmount("Max")}
              mx={1}
            >
              Max
            </Button>
            <Button
              h="1.75rem"
              size="sm"
              bg={buttonBgColor}
              color={buttonTextColor}
              onClick={() => setSolAmount("Half")}
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
              fontSize={"sm"}
            >
              Balance: [Wallet not connected!]
            </Text>
            <Text
              position={"absolute"}
              bottom={2}
              right={2}
              zIndex={5}
              fontSize={"sm"}
            >
              $41,2300
            </Text>
            <Input
              h={24}
              w={"full"}
              textAlign={"right"}
              value={solAmount}
              onChange={handleSolChange}
              borderRadius="0px 6px 6px 0px"
              background="#dff0f5"
              focusBorderColor="transparent"
              isRequired
            />
          </Flex>
        </InputGroup>
        <Text fontSize="sm" mt={2}>
          Balance: 129.978543 USDC
        </Text>
      </Flex>
    </Flex>
  );
};

export default SwapComponent;
