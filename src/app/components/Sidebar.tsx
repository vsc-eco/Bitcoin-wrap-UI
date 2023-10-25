import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";

const Sidebar = () => {
  return (
    <Box
      bg="gray.200"
      w="200px"
      minH="100vh"
      p={4}
      boxShadow="lg"
    >
      <VStack spacing={4} align="start">
        <Flex alignItems="center" justifyContent="space-between">
          <NextLink href="/" passHref>
            <Flex alignItems="center">
              <AiOutlineHome />
              <Text ml={2} fontSize="lg" fontWeight="bold"> {/* Add margin to the left */}
                Home
              </Text>
            </Flex>
          </NextLink>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <NextLink href="/transactions" passHref>
            <Flex alignItems="center">
              <TfiMenuAlt />
              <Text ml={2} fontSize="lg" fontWeight="bold"> {/* Add margin to the left */}
                Transactions
              </Text>
            </Flex>
          </NextLink>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
