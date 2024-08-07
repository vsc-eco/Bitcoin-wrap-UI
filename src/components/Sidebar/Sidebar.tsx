import Image from "next/image";
import React from "react";
import { Box, VStack, Text, Flex, Button } from "@chakra-ui/react";
import { TbExchange } from "react-icons/tb";
import { MdAssessment } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import {
  AccountContext,
  useAccountContext,
} from "../../context/AccountContext";
import { useContext } from "react";
import { ResolveUsername } from "../../hooks/Hive";
import { BiSolidLogInCircle } from "react-icons/bi";
import LogoComponent from "../Logo/LogoComponent";

//TODO: restructure the items when logged out

const Sidebar = ({
  handleExchangeOnClick,
  handleTransactionOnClick,
  handleDexComponent,
  handleTradeComponent,
  handleSignUpComponent,
  resolveUsername,
}) => {
  const { triggerLoginWithHive, myDid } = useAccountContext();

  const did = resolveUsername;

  const menuItems = [
    {
      icon: <MdAssessment />,
      text: "Home",
      onClick: handleTradeComponent,
    },
    {
      icon: <TbExchange />,
      text: "Wrap",
      onClick: handleExchangeOnClick,
    },
    {
      icon: <MdOutlineCurrencyExchange />,
      text: "Dex",
      onClick: handleDexComponent,
    },
    {
      icon: <TfiMenuAlt />,
      text: "Transactions",
      onClick: handleTransactionOnClick,
    },
  ];

  return (
    <Flex
      flexDirection={"column"}
      gap={5}
      boxShadow="base"
      bgColor="white"
      paddingY="10px"
      paddingX={"20px"}
      position="relative"
    >
      <LogoComponent />
      <VStack align="start">
        {menuItems.map((item) => (
          <Flex
            key={item.text}
            alignItems="center"
            justifyContent={"center"}
            _hover={{ color: "#7392ee"}}
            onClick={item.onClick}
            marginX={"15px"}
          >
            <Flex alignItems={"center"} gap={2}>
              {item.icon}
              <Text ml={1} fontSize="sm" fontWeight={"bold"} cursor={"pointer"}>
                {item.text}
              </Text>
            </Flex>
          </Flex>
        ))}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginX="10px"
          position={"absolute"}
          bottom={"12px"}
          width={"100%"}
        >
          <Flex justifyContent="center" alignItems="center">
            <BiSolidLogInCircle size={"18px"} />
            <Text
              ml={2}
              fontSize="md"
              fontWeight="bold"
              onClick={handleSignUpComponent}
              cursor={"pointer"}
              colorScheme="gray"
            >
              Sign in
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Sidebar;
