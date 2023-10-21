import React from "react";
import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import NextLink from "next/link"; // Import Next.js Link
import { AiOutlineHome } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";

const Sidebar = () => {
  return (
    <Box
      bg="gray.200"
      w="200px"
      minH="100vh"
      p={4}
      position="fixed"
      top={0}
      left={0}
      boxShadow="lg"
    >
      <VStack spacing={4} align="start">
        <Flex alignItems="center">
          <NextLink href="/" passHref>
            {" "}
            {/* Use NextLink for client-side navigation */}
            <AiOutlineHome />
            <a>
              <Text fontSize="lg" fontWeight="bold">
                Home
              </Text>
            </a>
          </NextLink>
        </Flex>
        <Flex alignItems="center">
          <NextLink href="/transactions" passHref>
            {" "}
            {/* Use NextLink for client-side navigation */}
            <TfiMenuAlt />
            <a>
              <Text fontSize="lg" fontWeight="bold">
                Transactions
              </Text>
            </a>
          </NextLink>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Sidebar;
