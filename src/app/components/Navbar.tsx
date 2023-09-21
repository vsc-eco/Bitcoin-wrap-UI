"use client"
import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex bg="teal.500" px={5} py={4} justifyContent="space-between" alignItems="center">
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Box>
          <Link color='white'>WBTC Swap</Link>
        </Box>
      </Flex>

      <Box>
        <Link to="/" color='white' mx={2} fontWeight="bold">How it works</Link>
        <Link to="/" color='white' mx={2} fontWeight="bold">Loyalty Program</Link>
        <Link to="/" color='white' mx={2} fontWeight="bold">Contacts</Link>
        <Link to="/" color='white' mx={2} fontWeight="bold">Blog</Link>
      </Box>

    </Flex>
  );
};

export default Navbar;