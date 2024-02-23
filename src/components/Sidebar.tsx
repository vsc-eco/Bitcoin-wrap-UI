import Image from "next/image";
import React from "react";
import { Box, VStack, Text, Flex, Button } from "@chakra-ui/react";
import { TbExchange } from "react-icons/tb";
import { MdAssessment } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineCurrencyExchange } from "react-icons/md";

import { AccountContext, useAccountContext } from "../context/AccountContext";
import { useContext } from "react";
import { ResolveUsername } from "../hooks/Hive";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BiSolidLogOutCircle } from "react-icons/bi";

//check for the auth.login token 
const authToken = window!.localStorage.getItem("login.auth");

const logout = async () => {
  if(typeof window !== "undefined"){
    await window!.localStorage.removeItem("login.auth");
  }
  window.location.reload()
}

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
        {menuItems.map((item) => (
          <Flex
            key={item.text}
            alignItems="center"
            justifyContent={"center"}
            _hover={{ color: "blue.500" }}
            onClick={item.onClick}
            marginX={"10px"}
          >
            <Flex
            alignItems={"center"}
            >
              {item.icon}
              <Text
              ml={1}
              fontSize="lg"
              fontWeight={"bold"}
              cursor={"pointer"}
              >
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
         { !authToken ? (<Flex justifyContent="center" alignItems="center">
            <BiSolidLogInCircle size={"18px"}/>
            <Text
              ml={2}
              fontSize="lg"
              fontWeight="bold"
              onClick={handleSignUpComponent}
              cursor={"pointer"}
              colorScheme="gray"
            >
              Sign in
            </Text>
          </Flex>) : 
          (<Flex justifyContent="center" alignItems="center">
            <BiSolidLogOutCircle size={"18px"}/>
            <Text
              ml={2}
              fontSize="lg"
              fontWeight="bold"
              onClick={logout}
              cursor={"pointer"}
              colorScheme="gray"
            >
              Sign out
            </Text>
          </Flex>)}
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
