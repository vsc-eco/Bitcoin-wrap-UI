"use client"
import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import Image from "next/image"

import { AccountContext, useAccountContext } from "../context/AccountContext";
import { useContext } from "react";
import { ResolveUsername } from "../hooks/Hive";


const Sidebar = ({ handleExchangeOnClick, handleTransactionOnClick}) => {

  const {
    triggerLoginWithHive
  } = useAccountContext()
  const ac = useContext(AccountContext)

  const did = ResolveUsername("vaultec")
  console.log(did)

  //function for clicking the transactions 
  return (
    <Box
      w={["180px"]}
      h="71vh"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
      borderRadius={8}
      bgColor="white"
    >
      <VStack spacing={4} align="start" marginLeft={[".5rem",".5rem",".5rem",".5rem"]} py={5}>
        <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" _hover={{color: "blue.500"}} >
              <AiOutlineHome />
              <Text ml={2} fontSize="lg" fontWeight="bold" onClick={handleExchangeOnClick} style={{ cursor:"pointer"}}> 
                Home
              </Text>
            </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" _hover={{color: "blue.500"}} onClick={handleTransactionOnClick}>
              <TfiMenuAlt />
              <Text ml={2} fontSize="lg" fontWeight="bold" style={{ cursor:"pointer"}}>
                Transactions
              </Text>
            </Flex>
        </Flex>
        <Box>
          <Text fontSize='smaller'>Sign in with:</Text>
        <Flex bgColor="#1c1b1b" _hover={{bgColor:"black"}} p={2} borderRadius={3}>
        <Image src="/keychain.png" height={112} width={112} alt="keychain logo" onClick={triggerLoginWithHive} style={{cursor:"pointer"}} />
        </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;

