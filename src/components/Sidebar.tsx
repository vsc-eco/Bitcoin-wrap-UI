"use client"
import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import Image from "next/image"


const Sidebar = () => {


  function handleClick(){
    console.log("Clicked!")
  }
  //function for clicking the transactions 
  return (
    <Box
      w={["180px"]}
      h="70vh"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
    >
      <VStack spacing={4} align="start" marginLeft={[".5rem",".5rem",".5rem",".5rem"]}>
        <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" _hover={{color: "blue.500"}} >
              <AiOutlineHome />
              <Text ml={2} fontSize="lg" fontWeight="bold" > {/* Add margin to the left */}
                Home
              </Text>
            </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" _hover={{color: "blue.500"}}>
              <TfiMenuAlt />
              <Text ml={2} fontSize="lg" fontWeight="bold"> {/* Add margin to the left */}
                Transactions
              </Text>
            </Flex>
        </Flex>
        {/* TODO Add the hivekeychain logo here! */}
        <Box>
          <Text fontSize='smaller'>Sign in with:</Text>
        <Flex bgColor="#1c1b1b" _hover={{bg:"black"}} p={2}>
        <Image src="/keychain.png" height={112} width={112} alt="keychain logo" onClick={handleClick} style={{cursor:"pointer"}}/>
        </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;

