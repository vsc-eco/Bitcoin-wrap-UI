"use client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Image from "next/image";
import {RiArrowDropDownLine} from "react-icons/ri"
const Navbar = () => {
  const size = useBreakpointValue({ base: "xs", md: "md" });
  return (
    <Flex
      bg="teal.500"
      px={["2","3","4","6"]}
      py={5}
      justifyContent="space-between"
      alignItems="center"
      bgGradient="linear(to-l, #919ca9, #fefeff)"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Flex alignItems="center">
          <Box>
            {/* <Link color="#535454" size={size}></Link> */}
            <Image src="/logo.svg" alt="Icon" width={112} height={112} />
          </Box>
          <Text letterSpacing="0.1rem" fontWeight="bolder" fontSize={["8px", "12px"]}>VSC NETWORK</Text>
        </Flex>
      </Flex>
      <Flex mx={4}>
        <Link mx={4} fontWeight="bold" href="https://vsc.eco" target="_blank">
          <Flex alignItems="center">
          <Text size={size}>Main site</Text>
          <RiArrowDropDownLine />
          </Flex>
        </Link>
        <Link mx={4} fontWeight="bold">
          <Flex alignItems="center">
          <Text size={size}>FAQ</Text>
          <RiArrowDropDownLine />
          </Flex>
        </Link>
        {/* <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>Contacts</Text>
        </Link>
        <Link color="#535454" mx={2} fontWeight="bold" >
          <Text size={size}>Blog</Text>
        </Link> */}
      </Flex>
    </Flex>
  );
};

export default Navbar;
