"use client"
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";

const Navbar = () => {
  const size= useBreakpointValue({base:"xs", md:"md"})
  return (
    <Flex
      bg="teal.500"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
      bgColor="#f5f7f7"
      marginBottom="1px"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Box>
          <Link color="#535454" size={size}>WBTC Swap</Link>
        </Box>
      </Flex>
      <Flex>
        <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>How it works</Text>
        </Link>
        <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>Loyalty Program</Text>
        </Link>
        <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>Contacts</Text>
        </Link>
        <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>Blog</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
