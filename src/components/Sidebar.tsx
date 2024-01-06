import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import { TbExchange } from "react-icons/tb";
import { MdAssessment } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import Image from "next/image";

import { AccountContext, useAccountContext } from "../context/AccountContext";
import { useContext } from "react";
import { ResolveUsername } from "../hooks/Hive";

const Sidebar = ({
  handleExchangeOnClick,
  handleTransactionOnClick,
  handleDexComponent,
  handleTradeComponent,
}) => {
  const { triggerLoginWithHive, myDid } = useAccountContext();
  const ac = useContext(AccountContext);

  const did = ResolveUsername("vaultec");

  return (
    <Box 
      id="sidebar"
      w={["150px"]}
      h={["60vh"]}
      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
      borderRadius={8}
      bgColor="white"
      paddingY="10px"
      position="relative"
    >
      <VStack align="start">
        <Flex alignItems="center" justifyContent="space-between" marginX="10px">
          <Flex
            alignItems="center"
            _hover={{ color: "blue.500" }}
            onClick={handleTradeComponent}
          >
            <MdAssessment />
            <Text
              ml={1}
              fontSize="lg"
              fontWeight="bold"
              style={{ cursor: "pointer" }}
            >
              Home
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" marginX="10px">
          <Flex alignItems="center" _hover={{ color: "blue.500" }}>
            <TbExchange />
            <Text
              ml={2}
              fontSize="lg"
              fontWeight="bold"
              onClick={handleExchangeOnClick}
              style={{ cursor: "pointer" }}
            >
              Wrap
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" marginX="10px">
          <Flex alignItems="center" _hover={{ color: "blue.500" }}>
            <MdOutlineCurrencyExchange />
            <Text
              ml={2}
              fontSize="lg"
              fontWeight="bold"
              onClick={handleDexComponent}
              style={{ cursor: "pointer" }}
            >
              Dex
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" marginX="10px">
          <Flex
            alignItems="center"
            _hover={{ color: "blue.500" }}
            onClick={handleTransactionOnClick}
          >
            <TfiMenuAlt />
            <Text
              ml={1}
              fontSize="lg"
              fontWeight="bold"
              style={{ cursor: "pointer" }}
            >
              Transactions
            </Text>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginX="10px"
          position={"absolute"}
          bottom={"55px"}
          width={"100%"}
        >
          <Flex alignItems="center">
            <Text ml={2} fontSize="lg" fontWeight="bold">
              Sign in with:
            </Text>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginX="10px"
          position={"absolute"}
          bottom={"10px"}
          width={"100%"}
        >
          <Flex
            bgColor="#1c1b1b"
            _hover={{ bgColor: "black" }}
            p={2}
            borderRadius={3}
            onClick={triggerLoginWithHive}
          >
            <Image
              src="/keychain.png"
              height={112}
              width={115}
              alt="keychain logo"
              style={{ cursor: "pointer" }}
            />
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
