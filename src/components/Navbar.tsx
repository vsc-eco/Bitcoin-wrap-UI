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
      py={5}
      justifyContent="space-between"
      alignItems="center"
      bgGradient="linear(to-l, #919ca9, #fefeff)"
    >
      <Flex flexDirection="row"  alignItems="center">
        <Flex alignItems="center">
          <Box w={["12","16","20","24"]}>
            {/* <Link color="#535454" size={size}></Link> */}
            <Image src="/logo.svg" alt="Icon" width={150} height={150} />
          </Box>
          <Text letterSpacing="0.1rem" fontWeight="bolder" fontSize={["12px", "16px", "20px", "24px"]}>VSC NETWORK</Text>
        </Flex>
      </Flex>
      <Flex mx={["1","2","3","4"]}>
        <Link mx={4} fontWeight="bold" href="https://vsc.eco" target="_blank">
          <Flex alignItems="center">
          <Text fontSize={["10px", "10px", "12px", "16px"]}>Main site</Text>
          <RiArrowDropDownLine />
          </Flex>
        </Link>
        <Link mx={4} fontWeight="bold">
          <Flex alignItems="center">
          <Text fontSize={["10px", "10px", "12px", "16px"]}>FAQ</Text>
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
