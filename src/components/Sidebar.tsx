"use client"
import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";


const Sidebar = () => {

  //function for clicking the transactions 
  return (
    <Box
      w={["180px"]}
      h="63vh"
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
      </VStack>
    </Box>
  );
};

export default Sidebar;

